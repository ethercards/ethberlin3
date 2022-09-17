import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "dotenv"
import { task } from "hardhat/config";

const { config } = require("dotenv");
config();


const OWNER_PRIVATE_KEY =process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const GOERLI_PROVIDER = process.env.GOERLI_PROVIDER;



task(
  "accounts", "Prints the list of accounts", async (_, { ethers }) => {
    const accounts = await ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  }
);

module.exports = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    goerli:{
      url: GOERLI_PROVIDER,
      accounts: [OWNER_PRIVATE_KEY],
      chainId: 5,

    }
  },
  etherscan: {
   // Your API key for Etherscan
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    }
  },
  solidity: {
    version: "0.8.13",
    compilers: [
      { version: "0.6.0", settings: {} },
      { version: "0.6.6", settings: {} },
      { version: "0.7.5", settings: {} },
      { version: "0.8.7", settings: {} },
      { version: "0.8.13", settings: {} },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
