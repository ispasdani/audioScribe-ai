import React from "react";

type IconModalProps = {
  label: string;
};

const IconModal = ({ label }: IconModalProps) => {
  return (
    <div className="hidden absolute left-2/4 -translate-x-2/4 -top-10 text-sm bg-white-1 text-black-1 px-4 group-hover/openShow:block transition-all ease-linear">
      <div className="relative">
        <p>{label}</p>
        <svg
          width="10"
          height="5"
          viewBox="0 0 10 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-[5px] left-2/4 -translate-x-2/4 white"
        >
          <path d="M5 5L0 0H10L5 5Z" fill="white" />
        </svg>
      </div>
    </div>
  );
};

export default IconModal;
