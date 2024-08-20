"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BadgeCheck, Check } from "lucide-react";

type PlanCardProps = {
  name: string;
  price: number;
  credits: number;
  imageGeneration: number;
  userId: string;
  planId: string;
  description: string;
  messageOne: string;
  messageTwo: string;
  messageThree: string;
  messageFour: string;
  messageFive: string;
  messageSix: string;
};

const PlanCard = ({
  name,
  description,
  price,
  credits,
  imageGeneration,
  userId,
  planId,
  messageOne,
  messageTwo,
  messageThree,
  messageFour,
  messageFive,
  messageSix,
}: PlanCardProps) => {
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);

  const user = useQuery(api.users.getUserById, {
    clerkId: userId,
  });

  const handlePayment = async (planId: any) => {
    try {
      const sessionUrl = await createCheckoutSession({
        userId: user?._id!,
        planId: planId,
      });
      if (sessionUrl) {
        window.location.href = sessionUrl; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };
  return (
    <figure className="text-black-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg border border-gray-200 p-4 flex flex-col justify-between items-start">
      <p className="text-lg mb-5 font-bold">{name}</p>
      <p className="text-4xl font-extrabold mb-5">&#8364;{price}</p>
      <p className="text-lg">
        <span className="font-bold">Credits:</span>{" "}
        {credits.toLocaleString("de-DE")}
      </p>

      <p className="text-xs text-gray-500">1 credit = 1 character</p>
      <p className="mb-5 min-h-[120px] flex justify-center items-center">
        {description}
      </p>

      <button
        type="button"
        onClick={() => handlePayment(planId)}
        className={`border-none w-full bg-[#3841E6] bg-opacity-1 mb-5 px-4 rounded-lg text-white-1 font-bold py-3 hover:shadow-[0_10px_20px_rgba(56,_65,_230,_0.7)] transition-all duration-300 `}
      >
        Get {name}
      </button>
      <div className="w-full h-[2px] bg-gray-200 mb-5" />
      <ul>
        <li className=" text-black-1 min-h-[30px] flex justify-start items-center">
          <Check size={14} className="min-w-[25px]" />
          <span className="font-bold mr-2">Image Generation:</span>{" "}
          {imageGeneration}
        </li>
        <li className=" text-black-1 min-h-[30px] flex justify-start items-center">
          <Check size={14} className="min-w-[25px]" />
          {messageOne}
        </li>
        <li className="my-3 text-black-1 min-h-[30px] flex justify-start items-center">
          <Check size={14} className="min-w-[25px]" />
          {messageTwo}
        </li>
        <li className="my-3 text-black-1 min-h-[30px] flex justify-start items-center">
          <Check size={14} className="min-w-[25px]" />
          {messageThree}
        </li>
        <li className="my-3 text-black-1 min-h-[30px] flex justify-start items-center">
          <Check size={14} className="min-w-[25px]" />
          {messageFour}
        </li>
        <li className="my-3 text-black-1 min-h-[30px] flex justify-start items-center">
          <Check size={14} className="min-w-[25px]" />
          {messageFive}
        </li>
        <li className="my-3 text-black-1 min-h-[30px] flex justify-start items-center">
          <Check size={14} className="min-w-[25px]" />
          {messageSix}
        </li>
      </ul>
    </figure>
  );
};

export default PlanCard;
