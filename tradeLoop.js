let mutex = false;
const runTradeLoop = require('./tradeEngine');

module.exports = function () {
  setInterval(async () => {
    if (mutex) return;
    mutex = true;
    try {
      await runTradeLoop();
    } catch (e) {
      console.error("Trade loop error:", e);
    } finally {
      mutex = false;
    }
  }, 50);
};
