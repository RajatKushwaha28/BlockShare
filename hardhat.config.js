require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const RAJAT_PRIVATE_KEY = "b377d908d25d5accf753ca6c6815d2b065fc71211da048bd6e015d68f3864faa";
const SAKSHI_PRIVATE_KEY = "77f633c15ac938c55438d6c7cb50cc70168467a3183ffbda2887596fa15bff7d";
const ROHIT_PRIVATE_KEY = "f9a395691bc0c05d697ea99408f4aaeb2e4d75b8cfe910d13699d428b7a1ae47";
const PRIYAL_PRIVATE_KEY= "2c0ed3bfb6aceb5cb130e4ab42cc6cda8515c20d3ce68e7171a047a406590478";

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      accounts: [
                { privateKey: RAJAT_PRIVATE_KEY, balance: "1000000000000000000000000000" }, 
                { privateKey: SAKSHI_PRIVATE_KEY, balance: "1000000000000000000000000000" },
                { privateKey: ROHIT_PRIVATE_KEY, balance: "1000000000000000000000000000" },
                { privateKey: PRIYAL_PRIVATE_KEY, balance: "1000000000000000000000000000" } 
            ],
      chainId: 31337,
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};