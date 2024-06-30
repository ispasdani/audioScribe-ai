"use client";

import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { useAudio } from "@/app/providers/AudioProvider";
import { TtsDetailPlayerProps } from "@/types";

import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const TtsDetailPlayer = ({
  audioUrl,
  ttsTitle,
  author,
  imageUrl,
  ttsId,
  imageStorageId,
  audioStorageId,
  isOwner,
  authorImageUrl,
  authorId,
}: TtsDetailPlayerProps) => {
  const router = useRouter();
  const { setAudio } = useAudio();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePodcast = useMutation(api.tts.deleteTts);

  const handleDelete = async () => {
    try {
      await deletePodcast({ ttsId, imageStorageId, audioStorageId });
      toast({
        title: "Audio deleted",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting audio", error);
      toast({
        title: "Error deleting audio",
        variant: "destructive",
      });
    }
  };

  const handlePlay = () => {
    setAudio({
      title: ttsTitle,
      audioUrl,
      imageUrl,
      author,
      ttsId,
    });
  };

  if (!imageUrl || !authorImageUrl) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex w-full justify-between max-md:justify-center">
      <div className="flex flex-col gap-8 max-md:items-center md:flex-row">
        <Image
          src={imageUrl}
          width={250}
          height={250}
          alt="Story image"
          className="aspect-square rounded-lg"
        />
        <div className="flex w-full flex-col justify-between gap-5 max-md:items-center md:gap-9">
          <article className="flex flex-col gap-2 max-md:items-center">
            <h1 className="text-32 font-extrabold tracking-[-0.32px] text-black-1">
              {ttsTitle}
            </h1>
            <figure
              className="flex cursor-pointer items-center gap-2"
              onClick={() => {
                router.push(`/profile/${authorId}`);
              }}
            >
              <Image
                src={authorImageUrl}
                width={30}
                height={30}
                alt="Caster icon"
                className="size-[30px] rounded-full object-cover"
              />
              <h2 className="text-16 font-normal text-black-3">{author}</h2>
            </figure>
          </article>

          <div className="flex">
            <a
              href={imageUrl}
              download="profile-image.jpg" // You can specify a default filename
              className="bg-purple-600 text-white-1 px-4 py-2 rounded mr-2 hover:shadow-[rgba(147,_51,_234,_0.3)_0px_9px_20px] transition-all duration-300 text-center"
            >
              Download Image
            </a>
            <a
              href={audioUrl}
              download="profile-audio.mp3" // You can specify a default filename
              className="bg-purple-600 text-white-1 px-4 py-2 rounded ml-2 hover:shadow-[rgba(147,_51,_234,_0.3)_0px_9px_20px] transition-all duration-300 text-center"
            >
              Download Audio
            </a>
          </div>

          <Button
            onClick={handlePlay}
            className="text-16 w-full max-w-[250px] bg-purple-600 font-extrabold text-white-1 hover:shadow-[rgba(147,_51,_234,_0.3)_0px_9px_20px] transition-all duration-300"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />
            &nbsp; Play audio
          </Button>
        </div>
      </div>
      {isOwner && (
        <div className="relative mt-2">
          <Image
            src="/icons/three-dots.svg"
            width={20}
            height={30}
            alt="Three dots icon"
            className="cursor-pointer scale-150"
            onClick={() => setIsDeleting((prev) => !prev)}
          />
          {isDeleting && (
            <div
              className="absolute -left-32 -top-2 z-10 flex w-32 cursor-pointer justify-center gap-2 rounded-md bg-black-6 py-1.5 hover:bg-black-2"
              onClick={handleDelete}
            >
              <Image
                src="/icons/delete.svg"
                width={16}
                height={16}
                alt="Delete icon"
              />
              <h2 className="text-16 font-normal text-white-1">Delete</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TtsDetailPlayer;
