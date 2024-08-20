import Ecosystem from "@/sections/Ecosystem";
import Example from "@/sections/Example";
import Features from "@/sections/Features";
import Herobox from "@/sections/Herobox";
import OurMission from "@/sections/OurMission";
import React from "react";

const Home = () => {
  return (
    <div className="px-10">
      <Herobox />
      <Example />
      <Features />
      <OurMission />
      <Ecosystem />
    </div>
  );
};

export default Home;
