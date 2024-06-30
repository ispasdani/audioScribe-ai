"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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

  return (
    <section className="mt-10 flex flex-col z-10">
      <h1 className="text-6xl mb-8 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
        Generate Audio
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 gap-[30px] border-dashed border-2 border-gray-200 rounded-lg px-3 py-6">
            <FormField
              control={form.control}
              name="ttsTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-xl font-bold text-black-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write a title..."
                      {...field}
                      className="input-class focus-visible:ring-offset-purple-600"
                    />
                  </FormControl>
                  <FormMessage className="text-black-1" />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2.5">
              <Label className="text-xl font-bold text-black-1">
                Select AI Voice
              </Label>
              <Select onValueChange={(value) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none bg-gray-100 text-gray-400 focus-visible:ring-offset-purple-600"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice..."
                    className="placeholder-gray-100 text-16"
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-gray-100 font-bold text-black-1 focus:text-black-1">
                  {voiceCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize focus:bg-purple-600 focus:text-white-1"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
                {voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="ttsDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-xl font-bold text-black-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short podcast description..."
                      {...field}
                      className="input-class focus-visible:ring-offset-purple-600"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col">
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

            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-purple-600 py-4 font-extrabold text-white-1 transition-all duration-500 hover:shadow-[0_10px_20px_rgba(147,_51,_234,_0.7)]"
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
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateTts;
