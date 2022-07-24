require("@nomicfoundation/hardhat-toolbox");

const MUMBAI_PRIVATE_KEY =
  "4455cd9e24d853d9696639318ea3b57d299590bc7e328be1a0d4375610041434";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  hardhat: {
    chainId: 1337,
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/PKDcpW-zo09u7KieHzUl5H0qujGgr5nv`,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
  },
};
