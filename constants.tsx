export const contractAddress = "0x096a455Ed4c2829c63a07F51D26766BCD95190DE";
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
