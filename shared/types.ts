// shared/types.ts
// Canonical type definitions for CryptoInsight.
// Both frontend (src/) and backend (server/) import from here.
// These types mirror the OpenAPI contract defined in server/src/schemas/.

/** Top cryptocurrency from GET /api/coins */
export type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  atl: number;
};

/** Price data point from GET /api/coins/:id/history */
export type PricePoint = {
  date: string;
  value: number;
};

/** Educational coin detail from GET /api/coins/:id */
export type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  genesis_date: string | null;
  categories: string[];
  description: { en: string };
  links: {
    homepage: string[];
    twitter_screen_name: string;
    subreddit_url: string;
    repos_url: { github: string[] };
  };
};

/** Standard API error response */
export type ApiError = {
  error: string;
  statusCode: number;
};
