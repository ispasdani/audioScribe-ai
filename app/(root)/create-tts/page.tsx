"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import LoaderSpinner from "@/components/LoaderSpinner";
import CustomAudioPlayer from "@/components/CustomAudioPlayer";

const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

const formSchema = z.object({
  ttsTitle: z.string().min(2),
  ttsDescription: z.string().min(2),
});

const CreateTts = () => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return <LoaderSpinner />;

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioDuration, setAudioDuration] = useState(0);

  const [voiceType, setVoiceType] = useState<string | null>(null);
  const [voicePrompt, setVoicePrompt] = useState("");

  const createTts = useMutation(api.tts.createTts);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ttsTitle: "",
      ttsDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      if (!audioUrl || !imageUrl || !voiceType) {
        toast({
          title: "Please generate audio or image, or select a voice type",
        });
        setIsSubmitting(false);
        throw new Error(
          "Please generate audio or image, or select a voice type"
        );
      }

      const tts = await createTts({
        ttsTitle: data.ttsTitle,
        ttsDescription: data.ttsDescription,
        audioUrl,
        imageUrl,
        voiceType,
        imagePrompt,
        voicePrompt,
        views: 0,
        audioDuration,
        audioStorageId: audioStorageId!,
        imageStorageId: imageStorageId!,
      });

      toast({ title: "Audio created" });
      setIsSubmitting(false);

      router.push("/");
    } catch (error) {
      console.log(error);
      toast({ title: "Error on submitting the form", variant: "destructive" });
      setIsSubmitting(false);
    }
  }

  const deleteAudio = () => {
    setAudioUrl(""); // Delete the audio by clearing the URL
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "recording.wav";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="mt-10 mb-10 flex flex-col md:flex-row z-10 w-full px-10 bg-white-1 rounded-lg space-y-8 md:space-y-0 md:space-x-8">
      <div className="md:w-1/3 mb-8 md:mb-0">
        <h1 className="text-5xl font-extrabold text-black-1 mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            Text
          </span>{" "}
          to Speech
        </h1>
        <p className="text-lg text-black-1 mb-10">
          Type or paste anything and press{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            Generate
          </span>{" "}
          to convert your text into speech. Unlock your listening superpowers.
          Audiofy-AI can transform the way you consume content!
        </p>
      </div>

      <div className="md:w-2/3 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200 p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div className="flex flex-col lg:flex-row w-full">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="language-select"
                  className="text-lg font-medium mb-2 text-black-1"
                >
                  Select AI Voice
                </label>

                <div className="relative">
                  <select
                    id="voice-select"
                    value={voiceType || ""} // Ensure the select element is controlled
                    onChange={(e) => setVoiceType(e.target.value)}
                    className={`cursor-pointer w-full px-3 py-[1.4rem] bg-white-1 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                      voiceType ? "bg-white-1" : "bg-white-1"
                    }`}
                  >
                    <option value="" disabled className="text-gray-500">
                      Select AI Voice...
                    </option>
                    {voiceCategories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="capitalize text-black-1"
                      >
                        {category}
                      </option>
                    ))}
                    {voiceType && (
                      <audio
                        src={`/${voiceType}.mp3`}
                        autoPlay
                        className="hidden"
                      />
                    )}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full mt-5 lg:mt-0 lg:pl-3">
                <p className="text-lg font-medium mb-2 text-black-1">
                  Your Recording:
                </p>
                <CustomAudioPlayer audioUrl={audioUrl} onDelete={deleteAudio} />

                <button
                  onClick={downloadAudio}
                  className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors ${
                    audioUrl
                      ? "bg-green-600 hover:bg-green-700 text-white-1 cursor-pointer"
                      : "bg-gray-400 text-white-1 cursor-not-allowed"
                  }`}
                >
                  Download Recording
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start">
              <GeneratePodcast
                userId={user?.id}
                setAudioStorageId={setAudioStorageId}
                setAudio={setAudioUrl}
                voiceType={voiceType ? voiceType : ""}
                audio={audioUrl}
                voicePrompt={voicePrompt}
                setVoicePrompt={setVoicePrompt}
                setAudioDuration={setAudioDuration}
              />

              <GenerateThumbnail
                setImage={setImageUrl}
                setImageStorageId={setImageStorageId}
                image={imageUrl}
                imagePrompt={imagePrompt}
                setImagePrompt={setImagePrompt}
                userId={user?.id}
              />

              {/* <div className="mt-10 w-full">
                <Button
                  type="submit"
                  className="text-16 w-full bg-purple-600 py-4 font-extrabold text-white transition-all duration-500 hover:shadow-[0_10px_20px_rgba(147,_51,_234,_0.7)]"
                >
                  {isSubmitting ? (
                    <>
                      <p className="mr-2">Submitting</p>
                      <Loader size={20} className="animate-spin" />
                    </>
                  ) : (
                    "Submit & Publish Audio"
                  )}
                </Button>
              </div> */}
            </div>

            {/* <FormField
              control={form.control}
              name="ttsTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write a title..."
                      {...field}
                      className="border-gray-300 focus-visible:ring-offset-purple-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ttsDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-xl font-bold text-gray-800">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short podcast description..."
                      {...field}
                      className="border-gray-300 focus-visible:ring-offset-purple-600"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            /> */}
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreateTts;
