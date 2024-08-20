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
    <section className="mt-9 flex flex-col justify-center items-center w-full z-10 px-10">
      <h1 className="text-6xl mt-14 mb-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
        Credit Plans
      </h1>

      <p className="text-black-1 text-center w-full lg:max-w-[900px]">
        At Audiofy-AI, we prioritize flexibility and value, allowing you to
        purchase credits as you need them—no monthly subscription required. Each
        credit equals one character, putting you in full control of your
        spending and usage. Choose a plan that suits your needs, purchase your
        credits, and start converting text into high-quality audio immediately.
      </p>

      <p className="text-gray-400 mt-5 ">
        * Refunds are not accepted and cannot be requested *
      </p>

      <div className="w-full mt-24 mb-20 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {plans.map((plan) => (
          <PlanCard
            name={plan.name}
            price={plan.price}
            credits={plan.credits}
            imageGeneration={plan.imageGeneration}
            userId={user?.id}
            planId={plan?._id}
            key={plan._id}
            description={plan.description}
            messageOne={plan.messageOne}
            messageTwo={plan.messageTwo}
            messageThree={plan.messageThree}
            messageFour={plan.messageFour}
            messageFive={plan.messageFive}
            messageSix={plan.messageSix}
          />
        ))}
      </div>
    </section>
  );
};

export default Plans;
