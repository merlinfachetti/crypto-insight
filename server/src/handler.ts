// server/src/handler.ts
// Vercel Serverless Function handler.
// Wraps the Fastify app with @fastify/aws-lambda for serverless execution.

import awsLambdaFastify from "@fastify/aws-lambda";
import { buildApp } from "./app.js";

let proxy: ReturnType<typeof awsLambdaFastify> | null = null;

async function getProxy() {
  if (!proxy) {
    const app = await buildApp();
    await app.ready();
    proxy = awsLambdaFastify(app);
  }
  return proxy;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(event: any, context: any) {
  const proxy = await getProxy();
  return proxy(event, context);
}
