const { ethers } = require("ethers");
const { buildArbTransaction } = require('./arbLogic');
require('dotenv').config();

module.exports = async function () {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const txData = await buildArbTransaction(); // Your custom calldata builder

  const gasSettings = {
    maxFeePerGas: ethers.utils.parseUnits("100", "gwei"),
    maxPriorityFeePerGas: ethers.utils.parseUnits("50", "gwei"),
    gasLimit: 700000
  };

  try {
    const tx = await wallet.sendTransaction({ ...txData, ...gasSettings });
    const receipt = await tx.wait();
    if (receipt.status === 1) {
      console.log("✅ TX Success:", tx.hash);
    } else {
      console.warn("❌ TX Failed:", tx.hash);
    }
  } catch (e) {
    console.error("TX Error:", e.message);
  }
};
