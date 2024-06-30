import Image from "next/image";
import React from "react";

const OurMission = () => {
  return (
    <section className="w-full min-h-[80vh] mt-14 mb-40 flex flex-col items-center justify-start py-10">
      <h2 className="uppercase text-4xl font-bold text-center">
        Save Time and Money with{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          AI-Generated
        </span>{" "}
        Audio Content
      </h2>

      <div className="mt-40 flex flex-col justify-center items-center lg:flex-row w-full lg:justify-between lg:items-start">
        <Image
          src={"/icons/timesaving.svg"}
          alt="time saving"
          width={70}
          height={100}
          className="mt-12"
        />
        <div className="w-full flex flex-col md:max-w-[90%] xl:max-w-[85%] mx-5 my-10">
          <p className="font-bold text-2xl mb-5">Immediate Audio Generation</p>
          <p className="text-lg mb-5">
            Traditional Method: Recording and editing a 30-minute podcast can
            take several hours, including script preparation, recording
            sessions, editing, and post-production.
          </p>
          <p className="text-lg mb-8">
            With Our App: Simply enter your text, choose a voice type, and let
            our AI generate the audio in minutes. Save hours of production time
            instantly.
          </p>
          <p className="font-bold text-2xl mb-5">No Need for Retakes</p>
          <p className="text-lg mb-8">
            With Our App: AI-generated speech ensures consistency and accuracy
            in one go, eliminating the need for retakes.
          </p>
          <p className="font-bold text-2xl mb-5">Efficient Editing</p>
          <p className="text-lg mb-8">
            With Our App: The AI-generated audio is clean and error-free,
            drastically reducing the time needed for editing.
          </p>
        </div>
      </div>

      <div className="mt-40 flex flex-col justify-center items-center lg:flex-row w-full lg:justify-between lg:items-start">
        <div className="w-full flex flex-col md:max-w-[90%] xl:max-w-[85%] mx-5 my-10">
          <p className="font-bold text-2xl mb-5">No Studio Costs</p>
          <p className="text-lg mb-5">
            Traditional Method: Renting a professional recording studio can cost
            anywhere from $30 to $200 per hour
          </p>
          <p className="text-lg mb-8">
            With Our App: Generate high-quality audio content from the comfort
            of your home without any studio fees
          </p>
          <p className="font-bold text-2xl mb-5">
            No Professional Voice Actors
          </p>
          <p className="text-lg mb-5">
            Traditional Method: Hiring professional voice actors can cost
            between $100 to $500 per hour, depending on their experience and the
            project's complexity
          </p>
          <p className="text-lg mb-8">
            With Our App: Choose from a variety of AI-generated voices at a
            fraction of the cost
          </p>
          <p className="font-bold text-2xl mb-5">
            Reduced Post-Production Expenses
          </p>
          <p className="text-lg mb-5">
            Traditional Method: Post-production services, including sound
            editing and mastering, can add significant costs to your project
          </p>
          <p className="text-lg mb-8">
            With Our App: The AI-generated audio requires minimal
            post-production, saving you money on additional services
          </p>
        </div>
        <Image
          src={"/icons/moneysaving.svg"}
          alt="time saving"
          width={140}
          height={140}
          className="mt-12 ml-10"
        />
      </div>

      <div className="mt-40 flex flex-col justify-center items-center lg:flex-row w-full lg:justify-between lg:items-start">
        <Image
          src={"/icons/examples.svg"}
          alt="time saving"
          width={70}
          height={100}
          className="mt-12"
        />
        <div className="w-full flex flex-col md:max-w-[90%] xl:max-w-[85%] mx-5 my-10">
          <p className="font-bold text-2xl mb-5">Podcast Creation</p>
          <p className="text-lg mb-5">
            Traditional Method: Creating a weekly 30-minute podcast might take
            10 hours of work and $500 in production costs
          </p>
          <p className="text-lg mb-8">
            With Our App: Reduce production time to 1 hour per episode and costs
            to under $50, including a subscription to our service
          </p>
          <p className="font-bold text-2xl mb-5">Audiobook Production</p>
          <p className="text-lg mb-5">
            Traditional Method: Producing a 10-hour audiobook can take weeks of
            recording and editing, costing upwards of $5,000
          </p>
          <p className="text-lg mb-8">
            With Our App: Generate the entire audiobook in a day, costing less
            than $500
          </p>
          <p className="font-bold text-2xl mb-5">Sound Stories for Marketing</p>
          <p className="text-lg mb-8">
            Traditional Method: Creating a series of short sound stories for a
            marketing campaign could involve hiring multiple voice actors and
            sound engineers, costing several thousand dollars
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
