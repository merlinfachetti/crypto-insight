// api/[...path].ts
// Vercel Serverless Function — catch-all for /api/* and /docs/*
// Self-contained: all schemas, services and routes inlined to avoid
// cross-directory import issues with the Vercel bundler.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarReference from "@scalar/fastify-api-reference";
import axios, { AxiosError } from "axios";

// ============================================================================
// SCHEMAS
// ============================================================================

const healthResponseSchema = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["ok"], example: "ok" },
    timestamp: { type: "string", format: "date-time" },
    version: { type: "string", example: "1.0.0" },
  },
  required: ["status", "timestamp", "version"],
} as const;

const coinSchema = {
  type: "object",
  properties: {
    id: { type: "string" }, name: { type: "string" }, symbol: { type: "string" },
    image: { type: "string", format: "uri" },
    current_price: { type: "number" }, market_cap: { type: "number" },
    market_cap_rank: { type: "integer" }, total_volume: { type: "number" },
    price_change_percentage_24h: { type: "number" },
    circulating_supply: { type: "number" },
    total_supply: { type: ["number", "null"] },
    max_supply: { type: ["number", "null"] },
    ath: { type: "number" }, atl: { type: "number" },
  },
  required: [
    "id","name","symbol","image","current_price","market_cap",
    "market_cap_rank","total_volume","price_change_percentage_24h",
    "circulating_supply","total_supply","max_supply","ath","atl",
  ],
} as const;

const coinDetailSchema = {
  type: "object",
  properties: {
    id: { type: "string" }, name: { type: "string" }, symbol: { type: "string" },
    image: { type: "object", properties: { large: { type: "string", format: "uri" } }, required: ["large"] },
    genesis_date: { type: ["string", "null"] },
    categories: { type: "array", items: { type: "string" } },
    description: { type: "object", properties: { en: { type: "string" } }, required: ["en"] },
    links: {
      type: "object",
      properties: {
        homepage: { type: "array", items: { type: "string" } },
        twitter_screen_name: { type: "string" },
        subreddit_url: { type: "string" },
        repos_url: { type: "object", properties: { github: { type: "array", items: { type: "string" } } } },
      },
    },
  },
  required: ["id","name","symbol","image","genesis_date","categories","description","links"],
} as const;

const pricePointSchema = {
  type: "object",
  properties: { date: { type: "string" }, value: { type: "number" } },
  required: ["date", "value"],
} as const;

const errorResponseSchema = {
  type: "object",
  properties: { error: { type: "string" }, statusCode: { type: "integer" } },
  required: ["error", "statusCode"],
} as const;

const coinsQuerySchema = {
  type: "object",
  properties: {
    currency: { type: "string", enum: ["usd","eur","brl"], default: "usd" },
  },
} as const;

const coinIdParamSchema = {
  type: "object",
  properties: { id: { type: "string" } },
  required: ["id"],
} as const;

const priceHistoryQuerySchema = {
  type: "object",
  properties: {
    currency: { type: "string", enum: ["usd","eur","brl"], default: "usd" },
    days: { type: "integer", default: 7, minimum: 1, maximum: 30 },
  },
} as const;

// ============================================================================
// COINGECKO SERVICE WITH CACHE
// ============================================================================

const BASE_URL = "https://api.coingecko.com/api/v3";

type CacheEntry<T> = { data: T; expiresAt: number };
const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry || Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data as T;
}

function setCache<T>(key: string, data: T, ttl: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttl });
}

function handleApiError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ error?: string }>;
    const status = axiosErr.response?.status ?? 502;
    const message = axiosErr.response?.data?.error ?? `CoinGecko ${context} failed`;
    const err = new Error(message) as Error & { statusCode: number };
    err.statusCode = status;
    throw err;
  }
  throw new Error(`Unknown error: ${context}`);
}

async function fetchTopCryptos(currency: string = "usd") {
  const cacheKey = `coins:${currency}`;
  const cached = getCached<unknown[]>(cacheKey);
  if (cached) return cached;
  try {
    const res = await axios.get(`${BASE_URL}/coins/markets`, {
      params: { vs_currency: currency, order: "market_cap_desc", per_page: 10, page: 1, sparkline: false },
    });
    if (!Array.isArray(res.data)) throw new Error("Unexpected response");
    setCache(cacheKey, res.data, 60_000);
    return res.data;
  } catch (e) { handleApiError(e, "fetchTopCryptos"); }
}

async function fetchPriceHistory(coinId: string, currency: string = "usd", days: number = 7) {
  const cacheKey = `history:${coinId}:${currency}:${days}`;
  const cached = getCached<unknown[]>(cacheKey);
  if (cached) return cached;
  try {
    const res = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: { vs_currency: currency, days },
    });
    if (!res.data?.prices || !Array.isArray(res.data.prices)) throw new Error("Unexpected response");
    const points = (res.data.prices as [number, number][]).map(([ts, val]) => ({
      date: new Date(ts).toLocaleDateString(), value: parseFloat(val.toFixed(2)),
    }));
    setCache(cacheKey, points, 120_000);
    return points;
  } catch (e) { handleApiError(e, "fetchPriceHistory"); }
}

async function fetchCoinDetail(coinId: string) {
  const cacheKey = `detail:${coinId}`;
  const cached = getCached<unknown>(cacheKey);
  if (cached) return cached;
  try {
    const res = await axios.get(`${BASE_URL}/coins/${coinId}`, {
      params: { localization: false, tickers: false, market_data: false, community_data: false, developer_data: false, sparkline: false },
    });
    setCache(cacheKey, res.data, 300_000);
    return res.data;
  } catch (e) { handleApiError(e, "fetchCoinDetail"); }
}

// ============================================================================
// FASTIFY APP (cold-start cached across invocations)
// ============================================================================

let appReady: ReturnType<typeof Fastify> | null = null;

async function getApp() {
  if (appReady) return appReady;

  const app = Fastify({ logger: false });
  await app.register(cors, { origin: true });

  await app.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "CryptoInsight API",
        description: "Cryptocurrency market data and educational content.",
        version: "1.0.0",
        contact: { name: "Alden Merlin", url: "https://crypto-insight.aldenmerlin.com" },
      },
      servers: [{ url: "https://crypto-insight.aldenmerlin.com", description: "Production" }],
      tags: [
        { name: "System", description: "Health and status endpoints" },
        { name: "Coins", description: "Cryptocurrency market data" },
        { name: "Charts", description: "Historical price data" },
      ],
    },
  });

  app.get("/docs/json", { schema: { hide: true } }, async () => app.swagger());
  await app.register(scalarReference, { routePrefix: "/docs" });

  // --- Health ---
  app.get("/api/health", {
    schema: { tags: ["System"], summary: "Health check", response: { 200: healthResponseSchema } },
  }, async () => ({ status: "ok" as const, timestamp: new Date().toISOString(), version: "1.0.0" }));

  // --- GET /api/coins ---
  app.get<{ Querystring: { currency?: string } }>("/api/coins", {
    schema: {
      tags: ["Coins"], summary: "List top cryptocurrencies",
      description: "Returns the top 10 cryptocurrencies ranked by market cap.",
      querystring: coinsQuerySchema,
      response: { 200: { type: "array", items: coinSchema }, 502: errorResponseSchema },
    },
  }, async (req, reply) => {
    try { return await fetchTopCryptos(req.query.currency ?? "usd"); }
    catch (e) {
      const sc = (e as { statusCode?: number }).statusCode ?? 502;
      reply.status(sc);
      return { error: e instanceof Error ? e.message : "Failed", statusCode: sc };
    }
  });

  // --- GET /api/coins/:id ---
  app.get<{ Params: { id: string } }>("/api/coins/:id", {
    schema: {
      tags: ["Coins"], summary: "Get coin detail",
      description: "Returns educational information about a specific cryptocurrency.",
      params: coinIdParamSchema,
      response: { 200: coinDetailSchema, 502: errorResponseSchema },
    },
  }, async (req, reply) => {
    try { return await fetchCoinDetail(req.params.id); }
    catch (e) {
      const sc = (e as { statusCode?: number }).statusCode ?? 502;
      reply.status(sc);
      return { error: e instanceof Error ? e.message : "Failed", statusCode: sc };
    }
  });

  // --- GET /api/coins/:id/history ---
  app.get<{ Params: { id: string }; Querystring: { currency?: string; days?: number } }>(
    "/api/coins/:id/history", {
      schema: {
        tags: ["Charts"], summary: "Price history",
        description: "Returns historical price data points for rendering charts.",
        params: coinIdParamSchema, querystring: priceHistoryQuerySchema,
        response: { 200: { type: "array", items: pricePointSchema }, 502: errorResponseSchema },
      },
    }, async (req, reply) => {
      try {
        const { currency = "usd", days = 7 } = req.query;
        return await fetchPriceHistory(req.params.id, currency, days);
      } catch (e) {
        const sc = (e as { statusCode?: number }).statusCode ?? 502;
        reply.status(sc);
        return { error: e instanceof Error ? e.message : "Failed", statusCode: sc };
      }
    }
  );

  await app.ready();
  appReady = app;
  return app;
}

// ============================================================================
// VERCEL HANDLER
// ============================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await getApp();
  const url = req.url || "/";
  const method = (req.method || "GET") as "GET" | "POST" | "PUT" | "DELETE";

  const response = await app.inject({
    method, url,
    headers: req.headers as Record<string, string>,
    payload: req.body ? JSON.stringify(req.body) : undefined,
  });

  res.status(response.statusCode);
  for (const [key, value] of Object.entries(response.headers)) {
    if (value) res.setHeader(key, value as string);
  }
  res.send(response.body);
}
