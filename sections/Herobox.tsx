"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ExampleBox from "@/sections/ExampleBox";

const Herobox = () => {
  const [selectedCard, setSelectedCard] = useState({
    title: "Master Chief Speech for hard times",
    audioUrl: "/examples/masterchiefhardtimes/audio.mp3",
    imageUrl: "/examples/masterchiefhardtimes/cover.png",
    author: "Ispas Daniel-Nicolae",
    ttsId: "o4j39ivhh9v83h9vhi3rjiovjrh",
  });
  return (
    <>
      <Header
        title={selectedCard.title}
        audioUrl={selectedCard.audioUrl}
        imageUrl={selectedCard.imageUrl}
        author={selectedCard.author}
        ttsId={selectedCard.ttsId}
      />
      <ExampleBox setSelectedCard={setSelectedCard} />
    </>
  );
};

export default Herobox;
