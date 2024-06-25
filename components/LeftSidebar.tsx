"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useAudio } from "@/app/providers/AudioProvider";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { audio } = useAudio();

  return (
    <section
      className={cn("left_sidebar h-[calc(100vh-5px)]", {
        "h-[calc(100vh-116px)]": audio?.audioUrl,
      })}
    >
      <nav className="flex flex-col gap-6">
        <Link
          href={"/"}
          className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
        >
          <Image src={"/icons/logo.svg"} alt={"logo"} width={23} height={27} />
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
                "flex ga-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
                { "bg-nav-focus border-r-4 border-orange-1": isActive }
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p>{link.label}</p>
            </Link>
          );
        })}
      </nav>

      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button className="text-16 w-full bg-orange-1 font-extrabold">
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            className="text-16 w-full bg-orange-1 font-extrabold"
            onClick={() => signOut(() => router.push("/"))}
          >
            Log out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
