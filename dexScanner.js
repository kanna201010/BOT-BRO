const { ethers } = require("ethers");

const rpcPool = [
  "https://1rpc.io/polygon",
  "https://rpc.ankr.com/polygon",
  "https://polygon-bor.publicnode.com",
  "https://polygon-mainnet.public.blastapi.io"
];

module.exports = function getProvider() {
  const rpc = rpcPool[Date.now() % rpcPool.length];
  return new ethers.providers.JsonRpcProvider(rpc);
};
