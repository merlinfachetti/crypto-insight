import { describe, it, expect, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("CoinGecko Service", () => {
  it("should return an array of cryptocurrencies", async () => {
    const { fetchTopCryptos } = await import("../../src/services/coingecko");

    const mockData = [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image: "url",
        current_price: 50000,
        market_cap: 1000000000,
        price_change_percentage_24h: 2.5,
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchTopCryptos();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("id");
  });

  it("should handle API errors gracefully", async () => {
    const { fetchTopCryptos } = await import("../../src/services/coingecko");

    (axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("API unreachable")
    );

    await expect(fetchTopCryptos()).rejects.toThrow("Unknown Error");
  });
});
