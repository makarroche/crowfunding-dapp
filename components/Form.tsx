import { useEffect, useState } from "react";
import MagicButton from "./MagicButton";
import { useAccount, useContractWrite } from "wagmi";
import {contractAddress, contractABI} from "@/constants";
import moment from "moment";

const Form = () => {

  type Project = {
    name?: string;
    creator?:string;
    description?: string;
    goal?: string;
    startTime?: string;
    endTime?: string;
  };
  
  const [project, setProject] = useState<Project>({});
  const [createProjectClicked, setCreateProjectClicked] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "startProject",
  });

  useEffect(() => {
    if(createProjectClicked) checkFormValidation();
  }, [createProjectClicked]);

  const checkFormValidation = () => {
    setError(false);
    if (Object.keys(project).length < 6) {
      setError(true);
    }
    else {
      createNewProject();
      return;
    }
    setCreateProjectClicked(false);
  } 

  const createNewProject = () => {
    if(isConnected && address){
      setError(false);
      const goal = parseInt(project.goal as string); 
      const startTime = moment(project.startTime).unix();
      const endTime =  moment(project.endTime).unix();
      write({args: [project.name, project.description, goal, startTime, endTime]}); 
    }
    else {
      setError(true);
    }
    setCreateProjectClicked(false);
  }


  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50">
      <div>
        <div>
          <h1 className="font-bold text-black text-2xl mb-5">
            Welcome to the crowfunding project generator!
          </h1>
          <p className="text-black text-center">
            Explore our active fundings, donate or create one of your own
          </p>
        </div>
        <div className="mt-16">
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono text-black">
            Crowfunding
            <span className="text-sm text-purple-700">
              Create your own project
            </span>
          </h1>
          <div className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-purple-400">
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="creator"
                  name="creator"
                  id="creator"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Creator"
                  value = {project.creator}
                  onChange = {(e) => setProject({...project, creator: e.target.value})}
                />
                <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                  Creator
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="name"
                  name="Project name"
                  id="Project name"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Project name"
                  value = {project.name}
                  onChange = {(e) => setProject({...project, name: e.target.value})}
                />
                <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                  Project Name
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="description"
                  name="description"
                  id="description"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Description"
                  value = {project.description}
                  onChange = {(e) => setProject({...project, description: e.target.value})}
                />
                <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                  Description
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="goal"
                  name="goal"
                  id="goal"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Goal"
                  value = {project.goal}
                  onChange = {(e) => setProject({...project, goal: e.target.value})}
                />
                <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                  Goal
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="datetime-local"
                  name="start-time"
                  id="start-time"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="start-time"
                  value = {project.startTime as string}
                  onChange = {(e) => setProject({...project, startTime: e.target.value as string})}
                />
                <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                  Start Time
                </label>
              </div>
            </div>
            <div className="grid">
              <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
                  type="datetime-local"
                  name="end-time"
                  id="end-time"
                  className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="end-time"
                  value = {project.endTime}
                  onChange = {(e) => setProject({...project, endTime: e.target.value})}
                />
                <label className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">
                  End Time
                </label>
              </div>
            </div>
            <MagicButton action="Create Project" onClick={setCreateProjectClicked}></MagicButton>
            {error && <div className="text-sm text-purple-700">{isConnected && address? "Please fill all the fields!" : "Please connect your wallet first!"}</div>}
            {isLoading && <div className="text-sm text-purple-700">Creating your new project in the blockchain</div>}
            {isSuccess && <div className="text-sm text-purple-700">Project Created Succesfully: Transaction: {JSON.stringify(data)}</div>}
            {isError&& <div className="text-sm text-purple-700">Error creating your project, please try again!</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
