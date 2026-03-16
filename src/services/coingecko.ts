// src/services/coingecko.ts
// Frontend API client with resilience strategy:
//   1) Try the CryptoInsight backend (/api/*)
//   2) If it fails, fall back to CoinGecko directly
// This guarantees the app always shows data, even if the serverless
// function is cold-starting, misconfigured, or down.

import axios, { AxiosError } from "axios";
import type { PricePoint, Coin, CoinDetail } from "../../shared/types";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isAxiosError(err: unknown): err is AxiosError {
  return axios.isAxiosError(err);
}

function buildError(error: unknown, context: string): Error {
  if (isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const message =
      (error.response?.data as { error?: string })?.error ?? "API error";
    return new Error(`API Error ${status}: ${message}`);
  }
  if (error instanceof Error) return new Error(`${context}: ${error.message}`);
  return new Error(`Unknown error: ${context}`);
}

// ---------------------------------------------------------------------------
// Public API — backend first, CoinGecko fallback
// ---------------------------------------------------------------------------

/**
 * Fetches the top cryptocurrencies by market cap.
 */
export const fetchTopCryptos = async (
  currency: string = "usd"
): Promise<Coin[]> => {
  // 1) Try backend
  try {
    const res = await axios.get<Coin[]>("/api/coins", {
      params: { currency },
      timeout: 8000,
    });
    if (Array.isArray(res.data) && res.data.length > 0) return res.data;
  } catch {
    // Backend unavailable — fall through to direct CoinGecko
  }

  // 2) Fallback: CoinGecko direct
  try {
    const res = await axios.get<Coin[]>(`${COINGECKO_BASE}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    if (!Array.isArray(res.data)) {
      throw new Error("Unexpected response structure from CoinGecko");
    }
    return res.data;
  } catch (error) {
    throw buildError(error, "Failed to fetch cryptocurrencies");
  }
};

/**
 * Fetches price history for a single coin.
 */
export const fetchPriceHistory = async (
  coinId: string,
  currency: string = "usd"
): Promise<PricePoint[]> => {
  // 1) Try backend
  try {
    const res = await axios.get<PricePoint[]>(
      `/api/coins/${coinId}/history`,
      { params: { currency, days: 7 }, timeout: 8000 }
    );
    if (Array.isArray(res.data) && res.data.length > 0) return res.data;
  } catch {
    // Backend unavailable — fall through
  }

  // 2) Fallback: CoinGecko direct
  try {
    const res = await axios.get(
      `${COINGECKO_BASE}/coins/${coinId}/market_chart`,
      { params: { vs_currency: currency, days: 7 } }
    );
    if (!res.data?.prices || !Array.isArray(res.data.prices)) {
      throw new Error("Unexpected response structure from CoinGecko");
    }
    const raw: [number, number][] = res.data.prices;
    return raw.map(([timestamp, value]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      value: parseFloat(value.toFixed(2)),
    }));
  } catch (error) {
    throw buildError(error, "Failed to fetch price history");
  }
};

/**
 * Fetches educational details for a single coin.
 */
export const fetchCoinDetail = async (
  coinId: string
): Promise<CoinDetail> => {
  // 1) Try backend
  try {
    const res = await axios.get<CoinDetail>(`/api/coins/${coinId}`, {
      timeout: 8000,
    });
    if (res.data?.id) return res.data;
  } catch {
    // Backend unavailable — fall through
  }

  // 2) Fallback: CoinGecko direct
  try {
    const res = await axios.get(`${COINGECKO_BASE}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return res.data;
  } catch (error) {
    throw buildError(error, "Failed to fetch coin details");
  }
};
