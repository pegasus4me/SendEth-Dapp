import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks : {
    arbitrumSepolia :{
      url : process.env.RPC,
      accounts : [`${process.env.PRIVATE}`]
    }
  }
};

export default config;
