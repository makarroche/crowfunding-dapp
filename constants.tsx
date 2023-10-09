export const contractAddress = "0x725c7f9E5C460B5Ad2A0813e924fEd53B0f41BE7";
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
