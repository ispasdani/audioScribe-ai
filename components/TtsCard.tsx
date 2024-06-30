"use client";

import { api } from "@/convex/_generated/api";
import { TtsCardProps } from "@/types";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TtsCard = ({ imgUrl, title, description, ttsId }: TtsCardProps) => {
  const router = useRouter();
  const updateViews = useMutation(api.tts.updateTtsViews);

  const handleViews = async () => {
    //increase views...
    await updateViews({ ttsId });

    router.push(`/tts/${ttsId}`, {
      scroll: true,
    });
  };

  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          width={174}
          height={174}
          alt={title}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-black-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-black-4">
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
};

export default TtsCard;
