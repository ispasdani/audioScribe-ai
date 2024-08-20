import SoundWave from "@/svgs/SoundWave";
import React from "react";

const Features = () => {
  return (
    <section className="w-full min-h-[30vh] flex flex-col items-center justify-start">
      <p className="text-5xl font-extrabold text-center">
        Why choose{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Audiofy-AI?
        </span>
      </p>
      <p className="mt-5">
        Make content more accessible to people with visual impairments or
        reading difficulties by converting text to speech.
      </p>

      <div className="w-[90%] my-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">Accessibility Enhancement</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            Make content more accessible to people with visual impairments or
            reading difficulties by converting text to speech.
          </p>
        </div>
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">Time-Saving</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            Listen to your content on the go, saving time and increasing
            productivity by turning reading time into listening time.
          </p>
        </div>
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">High-Quality AI Voices</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            Choose from a range of voices that are constantly improved and
            updated to ensure a lifelike, engaging audio experience.
          </p>
        </div>
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">Customization</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            Tailor the audio output with different voice styles, speeds, and
            tones to match your brand or personal preference.
          </p>
        </div>
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">Easy Sharing</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            Easily share your audio files across platforms, whether for
            educational purposes, marketing, or personal use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
