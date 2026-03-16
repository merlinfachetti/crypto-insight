// server/src/server.ts
// Dev server entry point — starts Fastify on localhost.
// In production, the Vercel serverless handler (handler.ts) is used instead.

import { buildApp } from "./app.js";

const PORT = Number(process.env.PORT) || 3001;

async function start() {
  const app = await buildApp();

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
