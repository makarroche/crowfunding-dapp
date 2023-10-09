export const contractAddress = "0xE021Ad261a7b278CeCf66EDEF1C6AcC283c40Cd4";
export const contractABI = require("../crowfunding-dapp/contract/abi.json");

export type Project = {
    id?:string;
    name?: string;
    creator?: string;
    description?: string;
    goal?: string;
    startTime?: string;
    endTime?: string;
    pledgedFunds?: string;
  };
