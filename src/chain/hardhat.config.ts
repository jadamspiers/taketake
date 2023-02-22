import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const optimismGoerliUrl = process.env.ALCHEMY_API_KEY 
  ? `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  : process.env.OPTIMISM_GOERLI_URL

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};

export default config;
