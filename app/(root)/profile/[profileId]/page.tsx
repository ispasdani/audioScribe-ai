"use client";

import { useQuery } from "convex/react";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";
import TtsCard from "@/components/TtsCard";

const ProfilePage = ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  const user = useQuery(api.users.getUserById, {
    clerkId: params.profileId,
  });

  const ttsData = useQuery(api.tts.getTtsByAuthorId, {
    authorId: params.profileId,
  });

  if (!user) return <LoaderSpinner />;

  const normalizedTtsData = ttsData
    ? {
        ...ttsData,
        tts: ttsData.tts.map((ttss) => ({
          ...ttss,
          audioUrl: ttss.audioUrl ?? null,
          imageUrl: ttss.imageUrl ?? null,
          audioStorageId: ttss.audioStorageId ?? null,
          imageStorageId: ttss.imageStorageId ?? null,
        })),
      }
    : null;

  return (
    <section className="mt-9 flex flex-col z-10">
      <h1 className="text-20 font-bold text-black-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          ttsData={normalizedTtsData!}
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
        />
      </div>
      <div className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-black-1">
          All Stories Generated:
        </h1>
        {ttsData && ttsData.tts.length > 0 ? (
          <div className="podcast_grid">
            {ttsData?.tts.map((ttss) => (
              <TtsCard
                key={ttss._id}
                imgUrl={ttss.imageUrl!}
                title={ttss.ttsTitle!}
                description={ttss.ttsDescription}
                ttsId={ttss._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any audio's yet"
            buttonLink="/create-tts"
            buttonText="Generate Audio"
          />
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
