// server/src/app.ts
// Builds and configures the Fastify application.
// Imported by both the dev server (server.ts) and the Vercel handler (handler.ts).

import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerSwagger } from "./plugins/swagger.js";
import healthRoutes from "./routes/health.js";
import coinsRoutes from "./routes/coins.js";
import chartsRoutes from "./routes/charts.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  // --- Plugins ---
  await app.register(cors, { origin: true });
  await registerSwagger(app);

  // --- Routes ---
  await app.register(healthRoutes);
  await app.register(coinsRoutes);
  await app.register(chartsRoutes);

  return app;
}
