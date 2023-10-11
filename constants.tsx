export const contractAddress = "0x096a455Ed4c2829c63a07F51D26766BCD95190DE";
export const contractERC20 = "0x08f61eEcA204cA7deb8AFDFD30775e9838fD6B39";
export const contractABI = require("../crowfunding-dapp/contract/abi.json");
export const contractERC20ABI = require("../crowfunding-dapp/contract/abiERC20.json");

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
