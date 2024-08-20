import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useAction, useMutation } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

const GenerateThumbnail = ({
  setImage,
  setImageStorageId,
  image,
  imagePrompt,
  setImagePrompt,
  userId,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getImageUrl = useMutation(api.tts.getUrl);
  const handleGenerateThumbnail = useAction(api.openai.generateImageAction);
  const [startedGenerating, setStartedGenerating] = useState(false);

  const handleImage = async (blob: Blob, fileName: string) => {
    setIsImageLoading(true);
    setStartedGenerating(false);
    setImage("");
    try {
      const file = new File([blob], fileName, { type: "image/png" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setImageStorageId(storageId);

      const imageUrl = await getImageUrl({ storageId });

      setImage(imageUrl!);

      setIsImageLoading(false);

      toast({
        title: "Thumbnail generated successfully",
      });
    } catch (error) {
      setIsImageLoading(false);
      setStartedGenerating(false);
      console.log(error);
      toast({ title: "Error generating Thumbnail", variant: "destructive" });
    }
  };

  const generateImage = async () => {
    setStartedGenerating(true);
    try {
      const response = await handleGenerateThumbnail({
        prompt: imagePrompt,
        userId: userId,
      });

      const blob = new Blob([response], { type: "image/png" });

      handleImage(blob, `thumbnail-${uuidv4()}`);
    } catch (error) {
      console.log(error);
      toast({ title: "Error generating thumbnail", variant: "destructive" });
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target.files;
      if (!files) return;

      const file = files[0];

      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      handleImage(blob, file.name);
    } catch (error) {
      console.log(error);
      toast({ title: "Error uploading image", variant: "destructive" });
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image!;
    link.download = "thumbnail.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full shadow-md bg-white-1 border border-gray-200 rounded-lg p-4 mt-10">
      <div className="">
        <Button
          type="button"
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("text-black-1", {
            "bg-[#3841e6] text-white-1": isAiThumbnail,
          })}
        >
          Use AI to generate thumbnail
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className="mt-3 flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-black-1 mt-3">
              Prompt to generate cover
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-purple-600"
              placeholder="Provide text to generate cover..."
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-start items-center">
            <Button
              type="button"
              className="w-full text-16 bg-[#3841e6] duration-500 hover:shadow-[0_10px_20px_rgba(56,_65,_230,_0.7)] py-4 font-bold text-white-1 transition-all"
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  <p className="mr-2">Generating</p>
                  <Loader size={20} className="animate-spin" />
                </>
              ) : (
                "Generate"
              )}
            </Button>
            {startedGenerating && (
              <Loader className="ml-3 animate-spin text-purple-600" />
            )}
          </div>
          {image && (
            <Button
              type="button"
              className="mt-4 w-full py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white-1 transition-colors"
              onClick={downloadImage}
            >
              Download Image
            </Button>
          )}
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef?.current?.click()}>
          {/* <Input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={(e) => uploadImage(e)}
          />
          {!isImageLoading ? (
            <Image
              src={"/icons/upload-image.svg"}
              width={40}
              height={40}
              alt="upload"
            />
          ) : (
            <div className="flex-center text-16 font-medium text-white-1">
              Uploading
              <Loader size={20} className="animate-spin" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-purple-600">
              Click to upload
            </h2>
            <p className="text-12 font-normal text-gray-1">
              SVG, PNG, JPG, or GIF (max. 1080x1080px)
            </p>
          </div> */}
        </div>
      )}
      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            width={200}
            height={200}
            className="mt-5 rounded-md"
            alt="thumbnail"
          />
        </div>
      )}
    </div>
  );
};

export default GenerateThumbnail;
