// server/src/services/coingecko.ts
// CoinGecko API proxy with in-memory TTL cache.
// Keeps CoinGecko free-tier rate limits under control (~30 req/min).

import axios, { AxiosError } from "axios";
import type { Coin, PricePoint, CoinDetail } from "../../../shared/types.js";

// Re-export types so route handlers can import from this module
export type { Coin, PricePoint, CoinDetail };

const BASE_URL = "https://api.coingecko.com/api/v3";

// ---------------------------------------------------------------------------
// Simple in-memory cache with TTL
// ---------------------------------------------------------------------------
type CacheEntry<T> = { data: T; expiresAt: number };
const cache = new Map<string, CacheEntry<unknown>>();

const CACHE_TTL = {
  coins: 60_000,        // 60s for market list
  history: 120_000,     // 2min for price history
  detail: 300_000,      // 5min for coin detail (rarely changes)
} as const;

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T, ttl: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttl });
}

// ---------------------------------------------------------------------------
// Error handling helper
// ---------------------------------------------------------------------------
function handleApiError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ error?: string }>;
    const status = axiosErr.response?.status ?? 502;
    const message = axiosErr.response?.data?.error ?? `CoinGecko ${context} failed`;
    const err = new Error(message);
    (err as Error & { statusCode: number }).statusCode = status;
    throw err;
  }
  throw new Error(`Unknown error: ${context}`);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetches top 10 cryptocurrencies by market cap.
 */
export async function fetchTopCryptos(currency: string = "usd"): Promise<Coin[]> {
  const cacheKey = `coins:${currency}`;
  const cached = getCached<Coin[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get<Coin[]>(`${BASE_URL}/coins/markets`, {
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

    setCache(cacheKey, response.data, CACHE_TTL.coins);
    return response.data;
  } catch (error) {
    handleApiError(error, "fetchTopCryptos");
  }
}

/**
 * Fetches price history for a single coin.
 */
export async function fetchPriceHistory(
  coinId: string,
  currency: string = "usd",
  days: number = 7
): Promise<PricePoint[]> {
  const cacheKey = `history:${coinId}:${currency}:${days}`;
  const cached = getCached<PricePoint[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: { vs_currency: currency, days },
    });

    if (!response.data?.prices || !Array.isArray(response.data.prices)) {
      throw new Error("Unexpected response structure from CoinGecko");
    }

    const points: PricePoint[] = (response.data.prices as [number, number][]).map(
      ([timestamp, value]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        value: parseFloat(value.toFixed(2)),
      })
    );

    setCache(cacheKey, points, CACHE_TTL.history);
    return points;
  } catch (error) {
    handleApiError(error, "fetchPriceHistory");
  }
}

/**
 * Fetches educational detail for a single coin.
 */
export async function fetchCoinDetail(coinId: string): Promise<CoinDetail> {
  const cacheKey = `detail:${coinId}`;
  const cached = getCached<CoinDetail>(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    setCache(cacheKey, response.data, CACHE_TTL.detail);
    return response.data;
  } catch (error) {
    handleApiError(error, "fetchCoinDetail");
  }
}
