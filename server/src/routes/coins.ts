// server/src/routes/coins.ts
import type { FastifyPluginAsync } from "fastify";
import { fetchTopCryptos, fetchCoinDetail } from "../services/coingecko.js";
import {
  coinListResponseSchema,
  coinDetailSchema,
  errorResponseSchema,
  coinsQuerySchema,
  coinIdParamSchema,
} from "../schemas/coin.js";

const coinsRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * GET /api/coins
   * Returns top 10 cryptocurrencies by market cap.
   */
  fastify.get<{ Querystring: { currency?: string } }>(
    "/api/coins",
    {
      schema: {
        tags: ["Coins"],
        summary: "List top cryptocurrencies",
        description:
          "Returns the top 10 cryptocurrencies ranked by market cap, with prices in the selected fiat currency.",
        querystring: coinsQuerySchema,
        response: {
          200: coinListResponseSchema,
          502: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const currency = request.query.currency ?? "usd";
        const coins = await fetchTopCryptos(currency);
        return coins;
      } catch (error) {
        const statusCode = (error as { statusCode?: number }).statusCode ?? 502;
        reply.status(statusCode);
        return {
          error: error instanceof Error ? error.message : "Failed to fetch coins",
          statusCode,
        };
      }
    }
  );

  /**
   * GET /api/coins/:id
   * Returns educational detail for a single coin.
   */
  fastify.get<{ Params: { id: string } }>(
    "/api/coins/:id",
    {
      schema: {
        tags: ["Coins"],
        summary: "Get coin detail",
        description:
          "Returns educational information about a specific cryptocurrency: description, categories, links and genesis date.",
        params: coinIdParamSchema,
        response: {
          200: coinDetailSchema,
          502: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const detail = await fetchCoinDetail(request.params.id);
        return detail;
      } catch (error) {
        const statusCode = (error as { statusCode?: number }).statusCode ?? 502;
        reply.status(statusCode);
        return {
          error: error instanceof Error ? error.message : "Failed to fetch coin detail",
          statusCode,
        };
      }
    }
  );
};

export default coinsRoutes;
