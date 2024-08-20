"use client";

import { examples } from "@/constants/examples";
import React from "react";

interface SelectedCard {
  title: string;
  audioUrl: string;
  imageUrl: string;
  author: string;
  ttsId: string;
}

type ExampleBoxProps = {
  setSelectedCard: React.Dispatch<React.SetStateAction<SelectedCard>>;
};

const ExampleBox = ({ setSelectedCard }: ExampleBoxProps) => {
  return (
    <div className="w-full min-h-[30vh] rounded-xl mt-10 mb-10">
      <div className="flex overflow-x-scroll gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {examples.map((example) => (
          <img
            src={example.imageUrl}
            className="w-[300px] sm:w-full rounded-xl hover:scale-[0.95] cursor-pointer transition-all duration-300 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            alt="Card Image"
            onClick={() =>
              setSelectedCard({
                title: example.title,
                audioUrl: example.audioUrl,
                imageUrl: example.imageUrl,
                author: example.author,
                ttsId: example.ttsId,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ExampleBox;
