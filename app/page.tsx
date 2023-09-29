"use client";
import Image from "next/image";
import { WagmiConfig, createConfig, configureChains, useAccount, useContractWrite, useContractRead } from "wagmi";
import { alchemyProvider } from "../lib/provider.js";
import { goerli } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import ProjectsDropdown from "../components/ProjectsDropdown";
import Toggle from "@/components/Toggle";
import Form from "@/components/Form";
import { useEffect, useState } from "react";
import ProjectDisplay from "@/components/ProjectDisplay";

type Project = {
  name?: string;
  creator?:string;
  description?: string;
  goal?: BigInteger;
  startTime?: BigInteger;
  endTime?: BigInteger;
};


export default function Home() {
  const [displayProject, setDisplayProject] = useState<boolean>(true);
  const defaultChains = [goerli];
  const [projects, setProjects] = useState<string[]>([]);
  // Configure chains & providers with the Alchemy provider.
  const { publicClient, webSocketPublicClient } = configureChains(
    defaultChains,
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string}),
      publicProvider(),
    ]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });


  const[cardProject, setCardProject] = useState<Project>({});

  return (
    <WagmiConfig config={config}>
      <div className="columns-2 text-center">
        <div className="">
          <ProjectsDropdown setCardProject={setCardProject}/>
        </div>
        <div className="">
          <Toggle />
        </div>
      </div>
      {displayProject ? <ProjectDisplay project={cardProject}/> : <Form></Form>}
    </WagmiConfig>
  );
}
