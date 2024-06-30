import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-40 px-5 py-10 min-h-[35vh] flex flex-col justify-between bg-white-1 relative bottom-0 border-dashed border-t-2 border-l-2 border-r-2 rounded-t-xl border-purple-600">
      <div className="w-full flex justify-around items-start flex-wrap">
        <div className="w-[300px]">
          <h2 className="font-bold text-2xl">
            Audio
            <span className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-500 mr-2">
              Scribe
            </span>
            AI
          </h2>
          <p className="mt-3">
            Empowering Contect Creators, Youtubers, Podcasters, and Ingenious
            People to Start Creating
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Legal</h2>
          <Link
            href={"/legal"}
            prefetch={false}
            className="border-b border-black-1 mt-3"
          >
            Terms of conditions
          </Link>
          <Link
            href={"/legal"}
            prefetch={false}
            className="border-b border-black-1 mt-3"
          >
            Privacy policy
          </Link>
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Check Out</h2>
          <Link
            href={"https://www.atlas-chat.com/"}
            prefetch={false}
            className="border-b border-black-1 mt-3"
          >
            AtlasChat-AI
          </Link>
          <Link
            href={"https://www.pixelwizard-ai.com/"}
            prefetch={false}
            className="border-b border-black-1 mt-3"
          >
            PixelWizard-AI
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <p className="bg-clip-text font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Copyright © 2024 - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
