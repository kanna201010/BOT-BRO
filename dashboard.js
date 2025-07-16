const express = require("express");
const cors = require("cors");
const ethers = require("ethers");
const wallet = require('./walletManager');

const app = express();
app.use(cors());

app.get("/api/balance", async (req, res) => {
  const balance = await wallet.getBalance();
  res.json({ MATIC: ethers.formatEther(balance) });
});

app.get("/api/status", (req, res) => {
  res.json({ running: true });
});

app.listen(3000, () => {
  console.log("Dashboard API running on port 3000");
});
