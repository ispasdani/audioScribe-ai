import SoundWave from "@/svgs/SoundWave";
import React from "react";

const Features = () => {
  return (
    <section className="w-full min-h-[80vh] mt-40 flex flex-col items-center justify-start py-10">
      <p className="uppercase text-4xl font-bold text-center">
        Generate{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          lifeLIKE
        </span>{" "}
        voices and narrate stories instantly with
      </p>

      <div className="w-full mt-40 flex flex-col">
        <p className="uppercase text-xl">ADVANTAGES</p>
        <div className="w-full flex flex-col xl:flex-row justify-between items-center min-h-[400px]">
          <div className="flex justify-center items-center mx-5 my-10">
            <SoundWave />
          </div>
          <div className="flex flex-col items-start justify-center w-full max-w-[550px] mx-5 my-10">
            <p className="font-bold text-2xl mb-5">
              Diverse Voices For Your Text
            </p>
            <p className="text-lg">
              Enhance your brand campaigns with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 font-bold mx-2">
                AudioScribe AI
              </span>{" "}
              diverse AI voices and avatars. Customize voice and style and stand
              out with powerfull speech synthesis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
