"use client";

import TtsCard from "@/components/TtsCard";
import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const [page, setPage] = useState(0);
  const [ttsData, setTtsData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 8;

  const data = useQuery(api.tts.getPaginatedTts, {
    limit,
    offset: page * limit,
  });

  const ttsTrendingData = useQuery(api.tts.getTrendingTts);

  useEffect(() => {
    if (data === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setTtsData(data.items);
      setTotalItems(data.totalItems);
    }
  }, [data]);

  const handleSeeMore = () => {
    if ((page + 1) * limit < totalItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSeeLess = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col gap-9 min-h-[100vh] z-10 mt-10">
      <div className="w-full flex flex-col flex-wrap">
        <h1 className="text-6xl mb-8 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 flex-center">
          Discover
        </h1>
        <div className="flex flex-col mb-10">
          <div className="flex w-full justify-between items-center ">
            <h2 className="text-2xl font-bold my-5">Latest Generated:</h2>
            <div className="flex justify-center items-center xl:mr-8">
              <button
                onClick={handleSeeLess}
                className={`mx-2 py-1 px-1 border-2 border-black-1 text-black-1 bg-white-1 rounded ${
                  page === 0
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-purple-600 hover:text-white-1 transition-all duration-150 hover:border-purple-600"
                }`}
                disabled={page === 0}
              >
                <ArrowLeft size={20} />
              </button>
              <p className="text-xl text-black-1">{page + 1}</p>
              <button
                onClick={handleSeeMore}
                className={`mx-2 py-1 px-1 border-2 border-black-1 text-black-1 bg-white-1 rounded ${
                  (page + 1) * limit >= totalItems
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-purple-600 hover:text-white-1 transition-all duration-150 hover:border-purple-600"
                }`}
                disabled={(page + 1) * limit >= totalItems}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <LoaderSpinner />
          ) : ttsData.length > 0 ? (
            <>
              <div className="podcast_grid">
                {ttsData.map(({ _id, ttsTitle, ttsDescription, imageUrl }) => (
                  <TtsCard
                    key={_id}
                    imgUrl={imageUrl as string}
                    title={ttsTitle}
                    description={ttsDescription}
                    ttsId={_id}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState title="Nothing to see" />
          )}
        </div>

        <div className="flex flex-col mb-10">
          <h2 className="text-2xl font-bold my-5">Top 4 Picks:</h2>

          {ttsTrendingData ? (
            <>
              {ttsTrendingData.length > 0 ? (
                <div className="podcast_grid">
                  {ttsTrendingData?.map(
                    ({ _id, ttsTitle, ttsDescription, imageUrl }) => (
                      <TtsCard
                        key={_id}
                        imgUrl={imageUrl as string}
                        title={ttsTitle}
                        description={ttsDescription}
                        ttsId={_id}
                      />
                    )
                  )}
                </div>
              ) : (
                <EmptyState title="Nothing now" />
              )}
            </>
          ) : (
            <LoaderSpinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
