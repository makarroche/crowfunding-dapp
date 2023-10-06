import Image from "next/image";
import myGif from "../public/gif/sparkles.gif"; //Credit: pislices.art/NFT
import MagicButton from "./MagicButton";
import { useEffect } from "react";
import moment from "moment";

type cardProps = {
  donationSucceeded: boolean;
  project: Project;
};

//Put same type in a separate file
type Project = {
  name?: string;
  creator?: string;
  description?: string;
  goal?: string;
  startTime?: string;
  endTime?: string;
};

const Card = ({ donationSucceeded, project }: cardProps) => {

  return (
    <div className="bg-gray-200 font-sans bg-indigo-950 h-screen w-full flex flex-row justify-center items-center">
      <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
        <Image
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
          src={myGif}
          alt="my gif"
          height={500}
          width={500}
        />
        <div className="text-center text-black mt-2 text-3xl font-medium">
          {project.name}
        </div>
        <div className="text-center text-black mt-2 font-light text-sm">
          {project.description}
        </div>
        <div className="text-center text-black mt-2 font-light text-sm">
        {project.creator}
        </div>
        <div className="px-6 mt-4 text-black text-center font-normal text-lg">
          <p> {project.goal?.toString() + " Sepolia ETH " }</p>
        </div>
        <hr className="mt-8"></hr>
        <div className="flex p-4">
          <div className="w-1/2 text-center text-black">
            <span className="font-bold">Start Time </span><br></br>{moment.unix((parseInt(project?.startTime as string))).format("D/M/YYYY H:mm")}
          </div>
          <div className="w-0 border border-gray-300 text-black"></div>
          <div className="w-1/2 text-center text-black">
            <span className="font-bold">End Time</span><br></br>{moment.unix((parseInt(project?.endTime as string))).format("D/M/YYYY H:mm")}
          </div>
        </div>
        <div className="mb-0.5 ml-20 text-base font-medium text-indigo-700 dark:text-indigo-500">
          Funds
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="w-52 text-end bg-gray-200 rounded-full h-3.5 mb-4 dark:bg-gray-700">
            <div className="bg-indigo-600 text-xs font-medium text-blue-100 text-center h-3.5 rounded-full dark:bg-indigo-500 w-6/12">
              50%
            </div>
            <span className="text-sm font-medium text-blue-700 dark:text-black">
              45%
            </span>
          </div>
        </div>
        <div className="text-center">
          <MagicButton action="Donate"></MagicButton>
        </div>
        <div className="text-center mb-2">
          {donationSucceeded && (
            <span className="text-sm font-medium text-green-700 dark:text-green">
              Succesfully donated, thank you!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
