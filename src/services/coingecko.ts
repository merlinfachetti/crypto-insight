// src/services/coingecko.ts
// Frontend API client — calls the CryptoInsight backend (not CoinGecko directly).
// In dev, Vite proxies /api → localhost:3001. In prod, Vercel rewrites handle it.

import axios, { AxiosError } from "axios";
import type { PricePoint, Coin, CoinDetail } from "../../shared/types";

/**
 * Shared error handler for all API calls.
 */
function handleError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ error?: string }>;
    const status = axiosErr.response?.status ?? 500;
    const message = axiosErr.response?.data?.error ?? "API error";
    throw new Error(`API Error ${status}: ${message}`);
  }

  if (error instanceof Error) {
    throw new Error(`${context}: ${error.message}`);
  }

  throw new Error(`Unknown error: ${context}`);
}

/**
 * Fetches the top cryptocurrencies by market cap.
 */
export const fetchTopCryptos = async (
  currency: string = "usd"
): Promise<Coin[]> => {
  try {
    const response = await axios.get<Coin[]>("/api/coins", {
      params: { currency },
    });

    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response structure");
    }

    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch cryptocurrencies");
  }
};

/**
 * Fetches price history for a single coin.
 */
export const fetchPriceHistory = async (
  coinId: string,
  currency: string = "usd"
): Promise<PricePoint[]> => {
  try {
    const response = await axios.get<PricePoint[]>(
      `/api/coins/${coinId}/history`,
      { params: { currency, days: 7 } }
    );

    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response structure");
    }

    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch price history");
  }
};

/**
 * Fetches educational details for a single coin.
 */
export const fetchCoinDetail = async (coinId: string): Promise<CoinDetail> => {
  try {
    const response = await axios.get<CoinDetail>(`/api/coins/${coinId}`);
    return response.data;
  } catch (error) {
    handleError(error, "Failed to fetch coin details");
  }
};
