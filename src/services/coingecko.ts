// src/services/coingecko.ts
import axios, { AxiosError } from "axios";
import type { CryptoCurrency } from "../types/crypto"; // resposta bruta da API
import type { PricePoint } from "../types/chart";
import type { Coin } from "../types/coin"; // tipo usado no app

const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetches the top cryptocurrencies by market cap, in the selected currency.
 * Maps the raw response to the internal `Coin` type.
 */
export const fetchTopCryptos = async (
  currency: string = "usd"
): Promise<Coin[]> => {
  try {
    const response = await axios.get<CryptoCurrency[]>(
      `${BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );

    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response structure from CoinGecko");
    }

    // Mapeia a estrutura bruta para o tipo `Coin`
    return response.data.map(
      (coin): Coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        market_cap_rank: coin.market_cap_rank,
        total_volume: coin.total_volume,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        circulating_supply: coin.circulating_supply,
        total_supply: coin.total_supply,
        max_supply: coin.max_supply,
        ath: coin.ath,
        atl: coin.atl,
      })
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: string }>;
      const status = axiosError.response?.status || 500;
      const message = axiosError.response?.data?.error || "API error";
      throw new Error(`API Error ${status}: ${message}`);
    }

    if (error instanceof Error) {
      throw new Error(`Unknown Error: ${error.message}`);
    }

    throw new Error("Unknown Error: Failed to fetch data");
  }
};

export const fetchPriceHistory = async (
  coinId: string,
  currency: string = "usd"
): Promise<PricePoint[]> => {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: currency,
      days: 7,
    },
  });

  const raw: [number, number][] = response.data.prices;

  return raw.map(([timestamp, value]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    value: parseFloat(value.toFixed(2)),
  }));
};
