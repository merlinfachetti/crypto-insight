// server/src/schemas/health.ts
// JSON Schema definitions for the health endpoint.
// These schemas feed both request validation and OpenAPI spec generation.

export const healthResponseSchema = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["ok"], example: "ok" },
    timestamp: {
      type: "string",
      format: "date-time",
      example: "2026-03-16T12:00:00.000Z",
    },
    version: { type: "string", example: "1.0.0" },
  },
  required: ["status", "timestamp", "version"],
} as const;
