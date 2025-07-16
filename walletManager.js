const { ethers } = require("ethers");
require('dotenv').config();

const txProvider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, txProvider);

module.exports = wallet;
