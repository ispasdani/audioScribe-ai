"use client";

import React from "react";
import Features from "@/sections/Features";
import OurMission from "@/sections/OurMission";
import Example from "@/sections/Example";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();

  return (
    <section className="mt-10 flex flex-col justify-center items-center z-10">
      <h1 className="text-6xl sm:text-8xl text-center font-bold mb-4">
        Create Your
      </h1>
      <h2 className="text-5xl sm:text-7xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 mb-4">
        Sound Story
      </h2>
      <p className="text-sm text-center mb-10">
        YOUR{" "}
        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          AI-POWERED
        </span>{" "}
        VOICE GENERATOR AND BEAUTIFIER
      </p>
      <Button className="bg-purple-600 mb-10 text-md text-white-1 hover:shadow-[rgba(147,_51,_234,_0.3)_0px_9px_20px] transition-all duration-300">
        Start Creating Now
      </Button>
      <p className="text-xl max-w-[600px] text-center mb-6">
        Easily convert text to voice and create a story, a podcast, an audiobook
        or learning material. Publish your{" "}
        <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Sound Story
        </span>{" "}
        or download and sell your work.
      </p>

      <div
        className="w-[90%] relative cursor-pointer group"
        onClick={() => router.push("/create-tts")}
      >
        <div className="w-full h-full justify-center items-center absolute top-0 left-0 bg-gray-300 opacity-50 rounded-xl hidden group-hover:flex" />
        <video
          autoPlay
          loop
          className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full bg-white-1 rounded-xl border-dashed border-2 border-purple-600 hover:bg-gray-300"
          muted
        >
          <source src="/videos/audioScribe-video.mp4" type="video/mp4" />
        </video>
      </div>

      <Example />
      <Features />
      <OurMission />
    </section>
  );
};

export default Home;
