// src/services/coingecko.ts
import axios from "axios";
import type { CryptoCurrency } from "../types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetches the top cryptocurrencies by market cap
 */
export const fetchTopCryptos = async (): Promise<CryptoCurrency[]> => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10,
      page: 1,
      sparkline: false,
    },
  });

  return response.data;
};
