const axios = require("axios");

let cachedRate = null;
let lastFetchTime = 0;

const CACHE_DURATION = 10 * 60 * 1000;

async function fetchCurrencyData() {
  try {
    const now = Date.now();

    if (cachedRate && (now - lastFetchTime) < CACHE_DURATION) {
      return cachedRate;
    }

    const res = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD",
      { timeout: 5000 }
    );

    const rate = res.data?.rates?.INR;

    if (!rate) throw new Error("Invalid rate");

    cachedRate = rate;
    lastFetchTime = now;

    console.log("💱 Rate:", rate);

    return rate;

  } catch (error) {
    console.error("Currency API error:", error.message);

    if (cachedRate) return cachedRate;

    return 83; 
  }
}

module.exports = { fetchCurrencyData };