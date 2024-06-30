"use client";

import { useAudio } from "@/app/providers/AudioProvider";
import TtsCard from "@/components/TtsCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Example = () => {
  const { setAudio } = useAudio();

  const handlePlay = () => {
    setAudio({
      title: "Motivational Speech by Master Chief",
      audioUrl: "/audio/testCardAudio.mp3",
      imageUrl: "/images/cardImg.png",
      author: "Your name",
      ttsId: "test card",
    });
  };

  return (
    <section className="w-full min-h-[70vh] mt-40 flex flex-col items-center justify-start py-10">
      <p className="uppercase text-4xl font-bold text-center">
        Empowering Contect Creators, Youtubers, Podcasters, and{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Ingenious People to Start
        </span>{" "}
        Creating
      </p>

      <div className="w-full mt-40 flex flex-col xl:flex-row xl:items-start justify-between items-center">
        <figure className="flex flex-col gap-2">
          <Image
            src={"/images/cardImg.png"}
            width={174}
            height={174}
            alt={"test card"}
            className="aspect-square h-fit w-full rounded-xl 2xl:size-[250px]"
          />
          <div className="flex flex-col">
            <h1 className="text-16 truncate font-bold text-black-1">
              Motivational Speech by Master Chief
            </h1>
            <h2 className="text-12 truncate font-normal capitalize text-black-4">
              Daily motivational speeches from Master Chief.
            </h2>
          </div>
        </figure>

        <div className="max-w-[600px] mx-5 my-10 xl:my-0 text-lg">
          <p>
            This is just an example. You can create a motivational speech that
            you can download and upload it to Youtube, Spotify or any other
            platforms and monetize it!
          </p>
          <Button
            onClick={handlePlay}
            className="text-16 mt-8 w-full max-w-[250px] bg-purple-600 font-extrabold text-white-1 hover:shadow-[rgba(147,_51,_234,_0.3)_0px_9px_20px] transition-all duration-300"
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
    </section>
  );
};

export default Example;
