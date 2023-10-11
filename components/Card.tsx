import Image from "next/image";
import myGif from "../public/gif/sparkles.gif"; //Credit: pislices.art/NFT
import MagicButton from "./MagicButton";
import moment from "moment";
import { Project, contractABI, contractAddress } from "@/constants";
import { useAccount, useContractWrite } from "wagmi";
import { useEffect, useState } from "react";

type cardProps = {
  project: Project;
  setCardProject: React.Dispatch<React.SetStateAction<Project>>;
};

const Card = ({ project, setCardProject }: cardProps) => {
  const goal = project?.goal;
  const { address } = useAccount();
  const [funds, setFunds] = useState<string>();
  const [projectChanged, setProjectChanged] = useState(false);

  useEffect(() => {
      setProjectChanged(true);
      const percentage = calculatePercentageOfFunds(0);
      setFunds(`${percentage}%`);
  }, [project]);


  const isItCreator = () => {
    return address === project?.creator;
  }

  const { data, isError, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: isItCreator() ? "claimFunds" : "pledge",
  });

  useEffect(() => {
    if(isSuccess && !isItCreator()){
      const percentage = calculatePercentageOfFunds(1);
      setFunds(`${percentage}%`);
    }
  }, [isSuccess, data]);

  const handleClickCreateProject = () => {
    setCardProject({});
  }

  const calculatePercentageOfFunds = (addFunds: number) => {
    const percentage = Math.round((parseFloat(isSuccess && !projectChanged ? funds as string : project.pledgedFunds as string) + addFunds)*100/(parseInt(goal as string)));
    return percentage;
  }

  const handleClickDonate = () => {
    //Mint Tokens in ERC20 Contract
    //Deploy Crowfunding with this contract address
    //Approve addresses of receivers in the ERC20 contract
    //Transfer tokens to receivers
    //Approve addresses of ERC20 for each sender
    //Pledge
    isItCreator() ?  write({args: [project?.id]}) : write({args: [project?.id,1]});
  }


  return (
    <div className="bg-gray-200 font-sans bg-indigo-950 h-screen w-full grid justify-center items-center">
      <h1 className="text-white text-center">Do as {project.name} and <span className="underline text-fuchsia-400" onClick={handleClickCreateProject}>create your own project!</span></h1>
      <div className="card w-96 mx-auto bg-white shadow-xl hover:shadow">
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
            <div className={`bg-indigo-600 text-xs font-medium text-blue-100 text-center h-3.5 rounded-full dark:bg-indigo-500 w-${calculatePercentageOfFunds()}`}>
              {funds}
            </div>
            <span className="text-sm font-medium text-blue-700 dark:text-black">
             {goal?.toString()}
            </span>
          </div>
        </div>
        <div className="text-center">
          <MagicButton action = {isItCreator() ? "Claim Funds": "Donate 1 MTK"} onClick={handleClickDonate}></MagicButton>
        </div>
        <div className="text-center mb-2">
          {isSuccess && (
            <span className="text-sm font-medium text-green-700 dark:text-green">
              {isItCreator() ? "Claimed Funds Sucessfully" : "Succesfully donated, thank you!"}
            </span>
          )}
          {isError && (
            <span className="text-sm font-medium text-green-700 dark:text-green">
              {isItCreator() ? "Error claiming funds please try again":"Error donating, please try again!"}
            </span>
          )}
          {isLoading && (
            <span className="text-sm font-medium text-green-700 dark:text-green">
              {isItCreator() ? "Claiming funds...": "Donating to the project.."}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
