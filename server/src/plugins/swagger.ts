// server/src/plugins/swagger.ts
import type { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import scalarReference from "@scalar/fastify-api-reference";

/**
 * Registers @fastify/swagger (OpenAPI spec generation) and
 * @scalar/fastify-api-reference (interactive docs UI at /docs).
 *
 * - GET /docs      → Scalar interactive UI
 * - GET /docs/json → raw OpenAPI 3.1 spec
 */
export async function registerSwagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "CryptoInsight API",
        description:
          "Backend API for CryptoInsight — cryptocurrency market data and educational content.",
        version: "1.0.0",
        contact: {
          name: "Alden Merlin",
          url: "https://crypto-insight.aldenmerlin.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3001",
          description: "Local development",
        },
      ],
      tags: [
        { name: "System", description: "Health and status endpoints" },
        { name: "Coins", description: "Cryptocurrency market data" },
        { name: "Charts", description: "Historical price data" },
      ],
    },
  });

  // Expose raw spec at /docs/json
  app.get("/docs/json", { schema: { hide: true } }, async () => {
    return app.swagger();
  });

  await app.register(scalarReference, {
    routePrefix: "/docs",
  });
}
