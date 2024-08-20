"use client";

import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GradientButton from "./GradientButton";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <nav className="sticky w-full h-[10vh] md:flex justify-between items-center px-10 hidden">
      <div
        className="flex justify-center items-center cursor-pointer group"
        onClick={() => router.push("/")}
      >
        <Image
          src={"/icons/logo.svg"}
          alt="Logo"
          width={23}
          height={23}
          className="group-hover:rotate-180 transition-all duration-300"
        />
        <p className="font-bold ml-2 text-xl">Audiofy-AI</p>
      </div>

      <ul className="flex justify-center items-center">
        <li className="mx-4 relative group text-black-1 hover:text-[#3841E6] transition-all duration-300">
          <Link href={"/create-tts"}>Text to Speech</Link>
          <span className="absolute bottom-0 left-0 transition-all duration-300 w-0 h-[2px] bg-black-1 group-hover:w-full group-hover:bg-[#3841E6]" />
        </li>
        <li className="mx-4 relative group text-black-1 hover:text-[#3841E6] transition-all duration-300">
          <Link href={"/create-stt"}>Speech to Text</Link>
          <span className="absolute bottom-0 left-0 transition-all duration-300 w-0 h-[2px] bg-black-1 group-hover:w-full group-hover:bg-[#3841E6]" />
        </li>
        <li className="mx-4 relative group text-black-1 hover:text-[#3841E6] transition-all duration-300">
          <Link href={"/#ecosystem"}>Ecosystem</Link>
          <span className="absolute bottom-0 left-0 transition-all duration-300 w-0 h-[2px] bg-black-1 group-hover:w-full group-hover:bg-[#3841E6]" />
        </li>
        <li className="mx-4 relative group text-black-1 hover:text-[#3841E6] transition-all duration-300">
          <Link href={"/plans"}>Credits</Link>
          <span className="absolute bottom-0 left-0 transition-all duration-300 w-0 h-[2px] bg-black-1 group-hover:w-full group-hover:bg-[#3841E6]" />
        </li>
      </ul>

      <div className="flex justify-center items-center">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-[40px] h-[40px]",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <div className="bg-[#3841E6] px-5 py-2 rounded-lg text-white-1 hover:scale-[1.1] transition-all duration-300">
            <GradientButton
              title="Sign In"
              onClickEvent={() => router.push("/sign-in")}
            />
          </div>
        </SignedOut>

        <SignedIn>
          <div className="bg-[#3841E6] ml-4 px-5 py-2 rounded-lg text-white-1 hover:scale-[1.1] transition-all duration-300">
            <GradientButton
              title="Log out"
              onClickEvent={() => signOut(() => router.push("/"))}
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Nav;
