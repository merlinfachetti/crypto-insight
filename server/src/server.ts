// server/src/server.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerSwagger } from "./plugins/swagger.js";
import healthRoutes from "./routes/health.js";
import coinsRoutes from "./routes/coins.js";
import chartsRoutes from "./routes/charts.js";

const PORT = Number(process.env.PORT) || 3001;

async function start() {
  const app = Fastify({ logger: true });

  // --- Plugins ---
  await app.register(cors, { origin: true });
  await registerSwagger(app);

  // --- Routes ---
  await app.register(healthRoutes);
  await app.register(coinsRoutes);
  await app.register(chartsRoutes);

  // --- Start ---
  await app.listen({ port: PORT, host: "0.0.0.0" });

  app.log.info(`API docs available at http://localhost:${PORT}/docs`);
  app.log.info(
    `OpenAPI spec available at http://localhost:${PORT}/docs/json`
  );
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
