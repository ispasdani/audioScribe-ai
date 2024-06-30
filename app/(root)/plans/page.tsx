"use client";

import LoaderSpinner from "@/components/LoaderSpinner";
import PlanCard from "@/components/PlanCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { useUser } from "@clerk/clerk-react";

const Plans = () => {
  const plans = useQuery(api.plans.getAllPlans);

  const { user } = useUser();

  if (!plans || !user) return <LoaderSpinner />;

  return (
    <section className="mt-9 flex flex-col justify-center items-center w-full z-10">
      <h1 className="text-6xl mb-8 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
        Credit Plans
      </h1>
      <div className="w-full min-h-[120px] rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 p-4 flex flex-col justify-center items-center">
        <p className="text-white-1 font-bold text-2xl text-center">
          Save Time and Money with AI-Generated Audio Content
        </p>
      </div>

      <p className="text-gray-400 font-bold mt-5">
        * Refunds are not accepted and cannot be requested *
      </p>

      <div className="flex justify-between items-center flex-wrap w-full mt-10">
        {plans.map((plan) => (
          <PlanCard
            name={plan.name}
            icon={plan.icon}
            price={plan.price}
            credits={plan.credits}
            characters={plan.characters}
            imageGeneration={plan.imageGeneration}
            userId={user?.id}
            planId={plan?._id}
            key={plan._id}
          />
        ))}
      </div>
    </section>
  );
};

export default Plans;
