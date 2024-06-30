"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import TtsCard from "@/components/TtsCard";
import TtsDetailPlayer from "@/components/TtsDetailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

const TtsDetails = ({
  params: { ttsId },
}: {
  params: { ttsId: Id<"tts"> };
}) => {
  const { user } = useUser();

  const tts = useQuery(api.tts.getTtsById, { ttsId });

  const isOwner = user?.id === tts?.authorId;

  if (!tts) return <LoaderSpinner />;

  return (
    <section className="flex w-full flex-col z-10">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-black-1">Total Views</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-Black-1">{tts.views}</h2>
        </figure>
      </header>

      <TtsDetailPlayer
        isOwner={isOwner}
        ttsId={tts._id}
        ttsTitle={tts.ttsTitle}
        author={tts.author}
        imageUrl={tts.imageUrl!}
        imageStorageId={tts.imageStorageId!}
        audioStorageId={tts.audioStorageId!}
        audioUrl={tts.audioUrl!}
        authorImageUrl={tts.authorImageUrl}
        authorId={tts.authorId}
      />

      <p className="text-black-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        {tts?.ttsDescription}
      </p>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-black-1">Transcription</h1>
          <p className="text-16 font-medium text-black-2">{tts?.voicePrompt}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-black-1">Thumbnail Prompt</h1>
          <p className="text-16 font-medium text-black-2">{tts?.imagePrompt}</p>
        </div>
      </div>
    </section>
  );
};

export default TtsDetails;
