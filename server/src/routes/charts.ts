// server/src/routes/charts.ts
import type { FastifyPluginAsync } from "fastify";
import { fetchPriceHistory } from "../services/coingecko.js";
import {
  priceHistoryResponseSchema,
  errorResponseSchema,
  coinIdParamSchema,
  priceHistoryQuerySchema,
} from "../schemas/coin.js";

const chartsRoutes: FastifyPluginAsync = async (fastify) => {
  /**
   * GET /api/coins/:id/history
   * Returns price history for a given coin.
   */
  fastify.get<{
    Params: { id: string };
    Querystring: { currency?: string; days?: number };
  }>(
    "/api/coins/:id/history",
    {
      schema: {
        tags: ["Charts"],
        summary: "Price history",
        description:
          "Returns historical price data points for a cryptocurrency, useful for rendering line charts.",
        params: coinIdParamSchema,
        querystring: priceHistoryQuerySchema,
        response: {
          200: priceHistoryResponseSchema,
          502: errorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { currency = "usd", days = 7 } = request.query;
        const history = await fetchPriceHistory(request.params.id, currency, days);
        return history;
      } catch (error) {
        const statusCode = (error as { statusCode?: number }).statusCode ?? 502;
        reply.status(statusCode);
        return {
          error: error instanceof Error ? error.message : "Failed to fetch price history",
          statusCode,
        };
      }
    }
  );
};

export default chartsRoutes;
