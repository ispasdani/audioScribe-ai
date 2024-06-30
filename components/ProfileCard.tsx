"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useAudio } from "@/app/providers/AudioProvider";
import { TtsProps, ProfileCardProps } from "@/types";

import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";

const ProfileCard = ({
  ttsData,
  imageUrl,
  userFirstName,
}: ProfileCardProps) => {
  const { setAudio } = useAudio();

  const [randomTts, setRandomTts] = useState<TtsProps | null>(null);

  const playRandomPodcast = () => {
    const randomIndex = Math.floor(Math.random() * ttsData.tts.length);

    setRandomTts(ttsData.tts[randomIndex]);
  };

  useEffect(() => {
    if (randomTts) {
      setAudio({
        title: randomTts.ttsTitle,
        audioUrl: randomTts.audioUrl || "",
        imageUrl: randomTts.imageUrl || "",
        author: randomTts.author,
        podcastId: randomTts._id,
      });
    }
  }, [randomTts, setAudio]);

  if (!imageUrl) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt="Podcaster"
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col justify-between max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt="verified"
            />
            <h2 className="text-14 font-medium text-black-2">
              Verified Creator
            </h2>
          </figure>
          <h1 className="text-32 font-extrabold tracking-[-0.32px] text-black-1 mb-4">
            {userFirstName}
          </h1>
        </div>
        {/* <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphones"
          />
          <h2 className="text-16 font-semibold text-black-1">
            {podcastData?.listeners} &nbsp;
            <span className="font-normal text-black-2">monthly listeners</span>
          </h2>
        </figure> */}
        {ttsData?.tts.length > 0 && (
          <Button
            onClick={playRandomPodcast}
            className="text-16 bg-purple-600 font-extrabold text-white-1"
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="random play"
            />{" "}
            &nbsp; Play a random audio
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
