import React from "react";

const OurMission = () => {
  return (
    <section className="w-full min-h-[30vh] flex flex-col items-center justify-start">
      <p className="text-5xl font-extrabold text-center">
        How{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Audiofy-AI{" "}
        </span>
        is Making a Difference
      </p>
      <p className="mt-5 text-center w-full lg:max-w-[900px]">
        At Audiofy-AI, our mission is to revolutionize the way people consume
        content by transforming text into immersive audio experiences. We
        believe in making information accessible, engaging, and convenient for
        everyone, whether you're a content creator, educator, business
        professional, or someone looking to make life a bit easier.
      </p>

      <div className="w-[90%] my-28 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">Enhancing Education</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            <span className="font-bold">Mission:</span> To support educators and
            students by making learning more accessible and versatile.
          </p>
          <p className="px-2 pt-2 pb-4">
            <span className="font-bold">Use Case:</span> Convert textbooks,
            study materials, and lectures into audio format, enabling learning
            on the go and catering to different learning styles, particularly
            for those who benefit from auditory learning.
          </p>
        </div>
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">Supporting Businesses</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            <span className="font-bold">Mission:</span> To help businesses
            communicate more effectively with their audiences by providing a
            tool that makes it easy to create polished audio content.
          </p>
          <p className="px-2 pt-2 pb-4">
            <span className="font-bold">Use Case:</span> Create professional
            audio for presentations, tutorials, customer support, and internal
            training materials, ensuring your message is heard loud and clear.{" "}
          </p>
        </div>
        <div className="w-full min-h-[200px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white-1 rounded-lg border border-gray-200">
          <p className="font-bold text-lg p-2">Promoting Accessibility</p>
          <div className="w-full h-[1px] bg-gray-200" />
          <p className="p-2">
            <span className="font-bold">Mission:</span> To make information
            accessible to everyone, regardless of their reading ability or
            visual impairment.
          </p>
          <p className="px-2 pt-2 pb-4">
            <span className="font-bold">Use Case:</span> Provide an accessible
            option for users who prefer listening over reading or who need audio
            versions due to disabilities, ensuring that content reaches a wider
            audience.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
