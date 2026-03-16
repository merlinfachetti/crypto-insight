// api/[...path].ts
// Vercel Serverless Function — catch-all route for /api/* and /docs/*
// Builds the Fastify app and wraps it with @fastify/aws-lambda.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarReference from "@scalar/fastify-api-reference";

// --- Import route handlers ---
import { healthResponseSchema } from "../server/src/schemas/health";
import {
  coinListResponseSchema,
  coinDetailSchema,
  priceHistoryResponseSchema,
  errorResponseSchema,
  coinsQuerySchema,
  coinIdParamSchema,
  priceHistoryQuerySchema,
} from "../server/src/schemas/coin";
import {
  fetchTopCryptos,
  fetchPriceHistory,
  fetchCoinDetail,
} from "../server/src/services/coingecko";

// ---------------------------------------------------------------------------
// Build Fastify app (cold start — cached across invocations)
// ---------------------------------------------------------------------------
let appReady: ReturnType<typeof Fastify> | null = null;

async function getApp() {
  if (appReady) return appReady;

  const app = Fastify({ logger: false });

  await app.register(cors, { origin: true });

  // Swagger
  await app.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "CryptoInsight API",
        description: "Backend API for CryptoInsight — cryptocurrency market data and educational content.",
        version: "1.0.0",
      },
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
  }, async () => ({
    status: "ok" as const,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  }));

  // --- GET /api/coins ---
  app.get<{ Querystring: { currency?: string } }>("/api/coins", {
    schema: {
      tags: ["Coins"],
      summary: "List top cryptocurrencies",
      querystring: coinsQuerySchema,
      response: { 200: coinListResponseSchema, 502: errorResponseSchema },
    },
  }, async (req, reply) => {
    try {
      return await fetchTopCryptos(req.query.currency ?? "usd");
    } catch (e) {
      const sc = (e as { statusCode?: number }).statusCode ?? 502;
      reply.status(sc);
      return { error: e instanceof Error ? e.message : "Failed", statusCode: sc };
    }
  });

  // --- GET /api/coins/:id ---
  app.get<{ Params: { id: string } }>("/api/coins/:id", {
    schema: {
      tags: ["Coins"],
      summary: "Get coin detail",
      params: coinIdParamSchema,
      response: { 200: coinDetailSchema, 502: errorResponseSchema },
    },
  }, async (req, reply) => {
    try {
      return await fetchCoinDetail(req.params.id);
    } catch (e) {
      const sc = (e as { statusCode?: number }).statusCode ?? 502;
      reply.status(sc);
      return { error: e instanceof Error ? e.message : "Failed", statusCode: sc };
    }
  });

  // --- GET /api/coins/:id/history ---
  app.get<{ Params: { id: string }; Querystring: { currency?: string; days?: number } }>(
    "/api/coins/:id/history", {
      schema: {
        tags: ["Charts"],
        summary: "Price history",
        params: coinIdParamSchema,
        querystring: priceHistoryQuerySchema,
        response: { 200: priceHistoryResponseSchema, 502: errorResponseSchema },
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

// ---------------------------------------------------------------------------
// Vercel handler
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await getApp();

  // Adapt Vercel req/res to Fastify's inject
  const url = req.url || "/";
  const method = (req.method || "GET") as "GET" | "POST" | "PUT" | "DELETE";

  const response = await app.inject({
    method,
    url,
    headers: req.headers as Record<string, string>,
    payload: req.body ? JSON.stringify(req.body) : undefined,
  });

  res.status(response.statusCode);

  // Forward headers
  const headers = response.headers;
  for (const [key, value] of Object.entries(headers)) {
    if (value) res.setHeader(key, value as string);
  }

  res.send(response.body);
}
