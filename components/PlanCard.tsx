"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type PlanCardProps = {
  name: string;
  icon: string;
  price: number;
  credits: number;
  characters: number;
  imageGeneration: number;
  userId: string;
  planId: string;
};

const PlanCard = ({
  name,
  icon,
  price,
  credits,
  characters,
  imageGeneration,
  userId,
  planId,
}: PlanCardProps) => {
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);

  const meteors = new Array(30).fill(true);

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
    <figure
      className={`relative overflow-hidden flex flex-col justify-evenly items-center my-10 w-[280px] h-[450px] border-dashed border-2 border-purple-600 rounded-xl bg-white-1  ${name.slice(0, 3).toLocaleLowerCase() === "pro" && "order-1 h-[470px] "} ${name.slice(0, 3).toLocaleLowerCase() === "pay" && "order-3"}`}
    >
      {name.slice(0, 3).toLocaleLowerCase() === "pro" && (
        <>
          {meteors.map((el, idx) => (
            <span
              key={"meteor" + idx}
              className={cn(
                "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-purple-600 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
                "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
              )}
              style={{
                top: 0,
                left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
                animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
                animationDuration:
                  Math.floor(Math.random() * (10 - 2) + 2) + "s",
              }}
            ></span>
          ))}
        </>
      )}
      <h2 className="font-extrabold text-xl my-5">{name}</h2>
      <Image
        src={icon}
        alt="plan icon"
        width={35}
        height={35}
        className="mb-4"
      />
      <div className="mb-3 flex justify-center items-center flex-col">
        <p className="font-extrabold text-4xl ">{price} &euro;</p>
        <p className="text-gray-400 text-sm">* Billed once</p>
      </div>

      <div className="w-full bg-[#f6f1fc] h-[30%] flex flex-col justify-evenly items-start p-3">
        <p className="text-bold text-black-1 text-md">
          <span className="font-extrabold mr-2 text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            Credits:
          </span>
          {credits}
        </p>
        <p className="text-bold text-black-1 text-md">
          <span className="font-extrabold mr-2 text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            Characters:
          </span>{" "}
          {characters}
        </p>
        <p className="text-bold text-black-1 text-md">
          <span className="font-extrabold mr-2 text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            Image Generation:
          </span>{" "}
          {imageGeneration}
        </p>
      </div>

      <button
        type="button"
        onClick={() => handlePayment(planId)}
        className={`${name.slice(0, 3).toLocaleLowerCase() === "pro" ? "border-none bg-purple-600 bg-opacity-1 my-4 px-4 rounded-lg text-white-1 font-bold py-3 hover:shadow-[0_10px_20px_rgba(147,_51,_234,_0.7)] transition-all duration-300" : "my-4 border border-purple-600 bg-white-1 px-4 rounded-lg text-purple-600 font-bold py-3 hover:bg-purple-600 hover:text-white-1 transition-all duration-300"}`}
      >
        Get {name}
      </button>
    </figure>
  );
};

export default PlanCard;
