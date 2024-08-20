"use client";

import { ListMusic, Speech } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import TtsCard from "./TtsCard";
import Image from "next/image";
import { Button } from "./ui/button";
import { useAudio } from "@/app/providers/AudioProvider";

type HeaderProps = {
  title: string;
  audioUrl: string;
  imageUrl: string;
  author: string;
  ttsId: string;
};

const Header = ({ title, audioUrl, imageUrl, author, ttsId }: HeaderProps) => {
  const router = useRouter();

  const { setAudio } = useAudio();

  const handlePlay = () => {
    setAudio({
      title: title,
      audioUrl: audioUrl,
      imageUrl: imageUrl,
      author: author,
      ttsId: ttsId,
    });
  };

  return (
    <header className="w-full min-h-[40vh] flex justify-between items-start flex-col lg:flex-row relative">
      <div className="mt-10 w-full lg:w-[60%] xl:w-[70%] flex flex-col justify-between items-start">
        <div>
          <h1 className="text-5xl font-extrabold">
            Listen Faster, Learn More.
          </h1>
          <h2 className="text-5xl font-extrabold">
            Let{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Audiofy-AI
            </span>{" "}
            do the reading for you.
          </h2>
          <p className="mt-5">
            Easily convert text into captivating audio content. Whether you're
            creating a podcast, audiobook, educational material, or assisting
            those with reading disabilities, Audiofy-AI empowers you to bring
            your words to life. Publish your Sound Story or download and sell
            your work effortlessly.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap">
          <button
            className="mr-5 flex border bg-white-1 text-black-1 hover:border-transparent hover:bg-[#3841e6] border-[#c5c5c5] relative px-4 py-2 rounded-full justify-center items-center hover:text-white-1 transition-all duration-300 group"
            onClick={() => router.push("/create-tts")}
          >
            <ListMusic />
            <span className="ml-2 text-sm font-bold uppercase z-10">
              Text to Speech
            </span>
          </button>

          <button className="mr-5 flex border bg-white-1 text-black-1 hover:border-transparent hover:bg-[#3841e6] border-[#c5c5c5] relative px-4 py-2 rounded-full justify-center items-center hover:text-white-1 transition-all duration-300 group">
            <Speech />
            <span className="ml-2 text-sm font-bold uppercase z-10">
              Speech to Text
            </span>
          </button>
        </div>
        <svg
          width="578"
          height="200"
          viewBox="0 0 578 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[200px] h-[100px] mt-5 ml-10"
        >
          <path
            d="M572.658 146.344C479.772 181.544 379.386 199.784 279.783 199.784C264.836 199.784 249.899 199.373 235.014 198.547C198.701 196.532 151.756 191.564 110.709 170.862C73.7296 152.212 46.4166 122.307 34.8976 88.757L-0.000366211 111.477L25.3787 0L87.5116 95.972L50.3575 87.414C61.2765 115.867 85.2906 141.243 117.463 157.469C137.723 167.687 169.487 179.887 235.846 183.571C347.835 189.785 462.461 172.063 567.341 132.318C571.213 130.851 575.544 132.799 577.013 136.673C578.482 140.547 576.532 144.877 572.658 146.344Z"
            fill="black"
          />
        </svg>
      </div>

      <div className="w-full lg:w-[40%] xl:w-[30%] mt-10 flex justify-end items-center">
        <div className="w-full min-h-[300px] rounded-xl flex flex-col justify-start items-center sm:flex-row sm:items-start lg:flex-col lg:justify-start lg:items-start lg:w-[300px]">
          <Image
            src={imageUrl}
            width={174}
            height={174}
            alt="card"
            className="aspect-square h-fit w-[300px] rounded-xl 2xl:size-[320px]"
          />
          <div className="flex flex-col justify-start items-start mt-1 sm:ml-5 lg:ml-0 lg:w-full">
            <p className="text-sm">{author}</p>
            <p className="text-16 truncate font-bold text-black-1">{title}</p>
            <Button
              onClick={handlePlay}
              className="text-sm mt-1 w-full bg-[#3841e6] font-bold text-white-1 hover:shadow-[rgba(56,_65,_230,_0.3)_0px_9px_20px] transition-all duration-300"
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
      </div>
    </header>
  );
};

export default Header;
