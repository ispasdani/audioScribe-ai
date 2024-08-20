import React from "react";

type GradientButtonProps = {
  title: string;
  onClickEvent?: () => void;
};

const GradientButton = ({ title, onClickEvent }: GradientButtonProps) => {
  return (
    <button className="" onClick={onClickEvent}>
      {title}
    </button>
  );
};

export default GradientButton;
