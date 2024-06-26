"use client";

import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./Header";
//to be added
// import Carousel from "./Carousel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import LoaderSpinner from "./LoaderSpinner";
import { useAudio } from "@/app/providers/AudioProvider";
import { cn } from "@/lib/utils";

const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();

  if (!topPodcasters) return <LoaderSpinner />;

  const { audio } = useAudio();

  return (
    <section
      // className={cn("right_sidebar text-white-1 h-[calc(100vh-5px)]", {
      //   "h-[calc(100vh-116px)]": audio?.audioUrl,
      // })}
      className="right_sidebar"
    >
      {/* <section>
        <Header headerTitle="Fans Like You" />
        <Carousel fansLikeDetail={topPodcasters} />
      </section> */}

      {/* <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcasters" />
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0, 4).map((podcaster) => (
            <div
              key={podcaster._id}
              className="flex cursor-pointer justify-between"
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.name}
                  className="aspect-square rounded-lg"
                  width={44}
                  height={44}
                />
                <h2 className="text-14 font-semibold text-white-1">
                  {podcaster.name}
                </h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal">
                  {podcaster.totalPodcasts}{" "}
                  {podcaster.totalPodcasts > 1 ? "podcasts" : "podcast"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </section>
  );
};

export default RightSidebar;
