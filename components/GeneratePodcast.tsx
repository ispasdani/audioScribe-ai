import { GenerateTtsProps } from "@/types";
import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "@/components/ui/use-toast";

const useGenerateTts = ({
  setAudio,
  voiceType,
  voicePrompt,
  setAudioStorageId,
  userId,
}: GenerateTtsProps) => {
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getTtsAudio = useAction(api.openai.generateAudioAction);

  const getAudioUrl = useMutation(api.tts.getUrl);

  const generateTts = async () => {
    setIsGenerating(true);
    toast({
      title: "start",
    });

    if (voicePrompt.length == 0) {
      console.log("no");
      toast({
        title: "Please provide a voice type to generate a podcast",
      });
      return setIsGenerating(false);
    }

    try {
      const response = await getTtsAudio({
        voice: voiceType,
        input: voicePrompt,
        userId: userId!,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });

      const fileName = `tts/${uuidv4()}.mp3`;

      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Audio generated successfully",
      });
    } catch (error) {
      console.log("Error generating audio", error);
      toast({
        title: "Error in creating a audio story",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateTts,
  };
};

const GeneratePodcast = (props: GenerateTtsProps) => {
  const { isGenerating, generateTts } = useGenerateTts(props);
  const MAX_CHARACTERS = 4000;
  const [remainingChars, setRemainingChars] = useState(MAX_CHARACTERS);

  useEffect(() => {
    setRemainingChars(MAX_CHARACTERS - props.voicePrompt.length);
  }, [props.voicePrompt]);

  return (
    <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 border-dashed border-2 border-gray-200 rounded-lg px-3 py-6 mt-10">
      <div className="flex flex-col gap-2.5 ">
        <Label className="text-xl font-bold text-black-1">
          AI Prompt to generate Audio
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-purple-600"
          placeholder="Provide text to generate audio..."
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
          maxLength={MAX_CHARACTERS} // Limit to 4000 characters
        />
        <div
          className={`text-right text-sm text-gray-500 ${remainingChars === 0 && "text-red-600"}`}
        >
          {remainingChars} characters remaining
        </div>
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="button"
          className="text-16 bg-purple-600 duration-500 hover:shadow-[0_10px_20px_rgba(147,_51,_234,_0.7)] py-4 font-bold text-white-1 transition-all"
          onClick={generateTts}
        >
          {isGenerating ? (
            <>
              <p className="mr-2">Generating</p>
              <Loader size={20} className="animate-spin" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
