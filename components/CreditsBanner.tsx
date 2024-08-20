import Link from "next/link";
import React from "react";

const CreditsBanner = () => {
  return (
    <Link
      href={"/plans"}
      className="w-full h-[5vh] bg-gradient-to-r from-blue-600 to-purple-500 flex justify-center items-center text-white-1 cursor-pointer hover:shadow-[0_10px_20px_rgba(56,_65,_230,_0.7)]"
    >
      By credits now.
    </Link>
  );
};

export default CreditsBanner;
