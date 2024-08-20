import { PinContainer } from "@/components/3dPin";
import React from "react";

const Ecosystem = () => {
  return (
    <div
      className="w-full min-h-[30vh] flex justify-center items-center flex-col"
      id="ecosystem"
    >
      <p className="text-5xl font-extrabold text-center">
        Take a look over our{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Ecosystem
        </span>
      </p>
      <p className="mt-5 text-center w-full lg:max-w-[900px]">
        Discover the power of integration with our suite of innovative apps.
        Each tool in our ecosystem is designed to work seamlessly together,
        allowing you to unlock new possibilities and enhance your creative
        workflow. Whether you're converting text to speech, generating stunning
        visuals, or crafting engaging content, our ecosystem provides everything
        you need to create something truly extraordinary. Explore our apps below
        and see how they can be combined to take your projects to the next
        level.
      </p>
      <div className="my-28 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        <div className="mb-10">
          <PinContainer
            title="atlas-chat.com"
            href="https://www.atlas-chat.com/"
          >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-black-1">
                ATLAS.chat
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Breaking down language barriers. Speak your native language
                  freely with anyone.
                </span>
              </div>
              <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            </div>
          </PinContainer>
        </div>
        <div className="mb-10">
          <PinContainer
            title="pixelfy-ai.com"
            href="https://www.pixelfy-ai.com/"
          >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-black-1">
                Pixelfy-AI
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Unleash the power of AI to edit, enhance, and transform your
                  photos or videos effortlessly.
                </span>
              </div>
              <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            </div>
          </PinContainer>
        </div>
        <div className="mb-10">
          <PinContainer title="sumly-ai.com" href="https://www.sumly-ai.com/">
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-black-1">
                Sumly-AI
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Summarize everything and go straight to the point.
                </span>
              </div>
              <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
            </div>
          </PinContainer>
        </div>
      </div>
    </div>
  );
};

export default Ecosystem;
