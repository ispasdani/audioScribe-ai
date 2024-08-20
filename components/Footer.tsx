import { soMeIcons } from "@/constants/some";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconModal from "./IconModal";

const Footer = () => {
  return (
    <div
      className="w-full mt-20 min-h-[50vh] flex flex-col justify-between bg-black-1 text-white-1"
      id="contact"
    >
      <div className="w-full h-[42vh] p-10 flex flex-col lg:flex-row justify-between items-start ">
        <div className="">
          <div>
            <p className="font-bold text-xl">Contact Us:</p>
            <p className="mt-1">
              Contact us if you encounter any issues or have any inquiries.
            </p>
            <p className="mt-2 flex justify-start items-center">
              <Mail size={20} />{" "}
              <span className="ml-2">dnis.ecotech@gmail.com</span>
            </p>
          </div>
          <div className="mt-10">
            <p className="font-bold text-xl">Follow us on:</p>
            <div className="flex mt-2">
              {soMeIcons.map((icon, index) => (
                <div
                  key={(index + 493) * 932058}
                  className="relative mr-4 hover:-translate-y-1 transition-all ease-linear group/openShow"
                >
                  <IconModal label={icon.title} />
                  <Link href={icon.link}>
                    <Image
                      src={icon.icon}
                      alt={icon.title}
                      width={22}
                      height={22}
                      className=""
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          <Link
            href={"/legal"}
            className="font-bold text-xl mr-5 hover:scale-[1.1] transition-all duration-300"
          >
            Terms of Use
          </Link>
          <Link
            href={"/legal"}
            className="font-bold text-xl hover:scale-[1.1] transition-all duration-300"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="w-full min-h-[8vh] flex flex-col my-5 md:my-0 md:flex-row justify-between items-center px-10">
        <p className="font-bold text-white-1">
          Copyright © 2024 EcoTech-System - All rights reserved
        </p>
        <a
          className="hover:scale-[1.1] transition-all duration-300"
          href="https://www.ecotech-systems.com/"
        >
          www.ecotech-system.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
