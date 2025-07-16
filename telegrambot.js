const TelegramBot = require('node-telegram-bot-api');
const ethers = require("ethers");
const wallet = require('./walletManager');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🟢 Sniper bot started!");
});

bot.onText(/\/wallet/, async (msg) => {
  const balance = await wallet.provider.getBalance(wallet.address);
  bot.sendMessage(msg.chat.id, `💰 Wallet: ${wallet.address}\nMATIC: ${ethers.formatEther(balance)}`);
});

bot.onText(/\/withdraw/, async (msg) => {
  try {
    const tx = await wallet.sendTransaction({
      to: process.env.COLD_WALLET,
      value: await wallet.getBalance()
    });
    bot.sendMessage(msg.chat.id, `✅ Withdrawing funds: ${tx.hash}`);
  } catch (e) {
    bot.sendMessage(msg.chat.id, `❌ Withdraw failed: ${e.message}`);
  }
});

module.exports = () => {};
