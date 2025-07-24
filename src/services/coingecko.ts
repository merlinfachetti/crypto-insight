// src/services/coingecko.ts
import axios, { AxiosError } from "axios";
import type { CryptoCurrency } from "../types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetches the top cryptocurrencies by market cap, in the selected currency.
 * Throws detailed errors with status and messages if available.
 */
export const fetchTopCryptos = async (
  currency: string = "usd"
): Promise<CryptoCurrency[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response structure from CoinGecko");
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: string }>;
      const status = axiosError.response?.status || 500;
      const message = axiosError.response?.data?.error || "API error";
      throw new Error(`API Error ${status}: ${message}`);
    }

    if (error instanceof Error) {
      throw new Error(`Unknown Error: ${error.message}`);
    }

    throw new Error("Unknown Error: Failed to fetch data");
  }
};
