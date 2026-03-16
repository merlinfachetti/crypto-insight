// server/src/schemas/coin.ts
// JSON Schema definitions for cryptocurrency endpoints.
// These schemas feed both Fastify validation and OpenAPI spec generation.

export const coinSchema = {
  type: "object",
  properties: {
    id: { type: "string", example: "bitcoin" },
    name: { type: "string", example: "Bitcoin" },
    symbol: { type: "string", example: "btc" },
    image: { type: "string", format: "uri", example: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    current_price: { type: "number", example: 70402.0 },
    market_cap: { type: "number", example: 1380000000000 },
    market_cap_rank: { type: "integer", example: 1 },
    total_volume: { type: "number", example: 28000000000 },
    price_change_percentage_24h: { type: "number", example: 2.35 },
    circulating_supply: { type: "number", example: 19700000 },
    total_supply: { type: ["number", "null"], example: 21000000 },
    max_supply: { type: ["number", "null"], example: 21000000 },
    ath: { type: "number", example: 73738 },
    atl: { type: "number", example: 67.81 },
  },
  required: [
    "id", "name", "symbol", "image", "current_price", "market_cap",
    "market_cap_rank", "total_volume", "price_change_percentage_24h",
    "circulating_supply", "total_supply", "max_supply", "ath", "atl",
  ],
} as const;

export const coinListResponseSchema = {
  type: "array",
  items: coinSchema,
} as const;

export const coinDetailSchema = {
  type: "object",
  properties: {
    id: { type: "string", example: "bitcoin" },
    name: { type: "string", example: "Bitcoin" },
    symbol: { type: "string", example: "btc" },
    image: {
      type: "object",
      properties: { large: { type: "string", format: "uri" } },
      required: ["large"],
    },
    genesis_date: { type: ["string", "null"], example: "2009-01-03" },
    categories: { type: "array", items: { type: "string" }, example: ["Cryptocurrency", "Proof of Work"] },
    description: {
      type: "object",
      properties: { en: { type: "string" } },
      required: ["en"],
    },
    links: {
      type: "object",
      properties: {
        homepage: { type: "array", items: { type: "string" } },
        twitter_screen_name: { type: "string" },
        subreddit_url: { type: "string" },
        repos_url: {
          type: "object",
          properties: {
            github: { type: "array", items: { type: "string" } },
          },
        },
      },
    },
  },
  required: ["id", "name", "symbol", "image", "genesis_date", "categories", "description", "links"],
} as const;

export const pricePointSchema = {
  type: "object",
  properties: {
    date: { type: "string", example: "3/10/2026" },
    value: { type: "number", example: 70123.45 },
  },
  required: ["date", "value"],
} as const;

export const priceHistoryResponseSchema = {
  type: "array",
  items: pricePointSchema,
} as const;

export const errorResponseSchema = {
  type: "object",
  properties: {
    error: { type: "string", example: "Failed to fetch data" },
    statusCode: { type: "integer", example: 502 },
  },
  required: ["error", "statusCode"],
} as const;

// Query string schemas for route validation
export const coinsQuerySchema = {
  type: "object",
  properties: {
    currency: {
      type: "string",
      enum: ["usd", "eur", "brl"],
      default: "usd",
      description: "Fiat currency for price conversion",
    },
  },
} as const;

export const coinIdParamSchema = {
  type: "object",
  properties: {
    id: { type: "string", description: "CoinGecko coin identifier (e.g. bitcoin, ethereum)" },
  },
  required: ["id"],
} as const;

export const priceHistoryQuerySchema = {
  type: "object",
  properties: {
    currency: {
      type: "string",
      enum: ["usd", "eur", "brl"],
      default: "usd",
      description: "Fiat currency for price conversion",
    },
    days: {
      type: "integer",
      default: 7,
      minimum: 1,
      maximum: 30,
      description: "Number of days of history",
    },
  },
} as const;
