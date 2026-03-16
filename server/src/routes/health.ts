// server/src/routes/health.ts
import type { FastifyPluginAsync } from "fastify";
import { healthResponseSchema } from "../schemas/health.js";

const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/api/health",
    {
      schema: {
        tags: ["System"],
        summary: "Health check",
        description:
          "Returns the current server status, timestamp and API version.",
        response: {
          200: healthResponseSchema,
        },
      },
    },
    async () => {
      return {
        status: "ok" as const,
        timestamp: new Date().toISOString(),
        version: "1.0.0",
      };
    }
  );
};

export default healthRoutes;
