// src/services/coingecko.ts
import axios, { AxiosError } from "axios";
import type { PricePoint } from "../types/chart";
import type { Coin } from "../types/coin";

const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetches the top cryptocurrencies by market cap, in the selected currency.
 * Returns data mapped to the internal `Coin` type.
 */
export const fetchTopCryptos = async (
  currency: string = "usd"
): Promise<Coin[]> => {
  try {
    const response = await axios.get<Coin[]>(
      `${BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );

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

export const fetchPriceHistory = async (
  coinId: string,
  currency: string = "usd"
): Promise<PricePoint[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: currency,
          days: 7,
        },
      }
    );

    if (!response.data?.prices || !Array.isArray(response.data.prices)) {
      throw new Error("Unexpected response structure from CoinGecko");
    }

    const raw: [number, number][] = response.data.prices;

    return raw.map(([timestamp, value]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      value: parseFloat(value.toFixed(2)),
    }));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message =
        (error.response?.data as { error?: string })?.error ?? "API error";
      throw new Error(`API Error ${status}: ${message}`);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to fetch price history: ${error.message}`);
    }

    throw new Error("Unknown error while fetching price history");
  }
};
