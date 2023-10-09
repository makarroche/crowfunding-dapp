"use client";
import Image from "next/image";
import { WagmiConfig, createConfig, configureChains, useAccount, useContractWrite, useContractRead } from "wagmi";
import { alchemyProvider } from "../lib/provider.js";
import { sepolia } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import ProjectsDropdown from "../components/ProjectsDropdown";
import Toggle from "@/components/Toggle";
import Form from "@/components/Form";
import { useState } from "react";
import ProjectDisplay from "@/components/ProjectDisplay";

type Project = {
  name?: string;
  creator?:string;
  description?: string;
  goal?: string;
  startTime?: string;
  endTime?: string;
};


export default function Home() {
  const defaultChains = [sepolia];
  const[cardProject, setCardProject] = useState<Project>({});

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
      {Object.keys(cardProject).length > 0 ? <ProjectDisplay project={cardProject} setCardProject={setCardProject} /> : <Form></Form>}
    </WagmiConfig>
  );
}
