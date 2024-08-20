"use client";

import { useAudio } from "@/app/providers/AudioProvider";
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
    <section className="w-full min-h-[30vh] flex flex-col items-center justify-start pt-10">
      <p className="text-5xl font-extrabold text-center">
        Generate your audio file with
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          {" "}
          just one click.
        </span>{" "}
        Download and share your audio instantly.
      </p>

      <div className="w-full md:max-w-[900px] my-28 flex flex-col items-center justify-between lg:flex-row lg:items-start">
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

        <div className="max-w-[600px] mx-5 xl:my-0 flex flex-col lg:items-start items-center justify-center">
          <p className="mt-5 text-center lg:text-start lg:mt-0">
            Create professional-sounding audio for presentations, tutorials, or
            customer interactions. Generate voiceovers for videos, podcasts, and
            social media content quickly and efficiently.
          </p>
          <Button
            onClick={handlePlay}
            className="text-sm mt-5 w-full lg:max-w-[180px] bg-[#3841e6] font-bold text-white-1 hover:shadow-[rgba(56,_65,_230,_0.3)_0px_9px_20px] transition-all duration-300"
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
