"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useAudio } from "@/app/providers/AudioProvider";
import GradientButton from "./GradientButton";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { audio } = useAudio();

  return (
    <section
      // className={cn("left_sidebar h-[calc(100vh-5px)]", {
      //   "h-[calc(100vh-116px)]": audio?.audioUrl,
      // })}
      className="left_sidebar"
    >
      <nav className="flex flex-col gap-6">
        <Link
          href={"/"}
          className="flex cursor-pointer items-center gap-1 pb-10 justify-center"
        >
          <Image
            src={"/icons/logo.svg"}
            alt={"logo"}
            width={30}
            height={30}
            className="mr-2"
          />
          <h1 className="text-24 font-extrabold text-white mag-lg:hidden">
            AudioScribe AI
          </h1>
        </Link>

        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={
                link.route === "/profile" ? `/profile/${user?.id}` : link.route
              }
              prefetch={false}
              key={link.label}
              className={cn(
                "flex ga-3 items-center py-4 px-4 justify-center lg:justify-start",
                { "bg-nav-focus border-r-4 border-blue-800": isActive }
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className="mr-2"
              />
              <p>{link.label}</p>
            </Link>
          );
        })}
      </nav>

      <div>
        <SignedIn>
          <Link href={`/profile/${user?.id}`} className="flex gap-3 px-4 pb-10">
            <UserButton />
            <div className="flex w-full items-center justify-between">
              <h1 className="text-18 truncate font-semibold text-white-1">
                {user?.firstName} {user?.lastName}
              </h1>
              <Image
                src={"/icons/right-arrow.svg"}
                width={26}
                height={26}
                alt="arrow profile"
              />
            </div>
          </Link>
        </SignedIn>

        <SignedOut>
          <div className="flex-center w-full pb-14 px-4">
            {/* <Button className="text-16 w-full bg-[#7209b7] font-extrabold">
              <Link href={"/sign-in"}>Sign In</Link>
            </Button> */}
            <GradientButton
              title="Sign In"
              onClickEvent={() => router.push("/sign-in")}
            />
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex-center w-full pb-14 px-4">
            <GradientButton
              title="Log out"
              onClickEvent={() => signOut(() => router.push("/"))}
            />
          </div>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
