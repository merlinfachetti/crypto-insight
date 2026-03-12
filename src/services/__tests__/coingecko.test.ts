import { describe, it, expect, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("CoinGecko Service", () => {
  it("should return an array of cryptocurrencies", async () => {
    const { fetchTopCryptos } = await import("../../../src/services/coingecko");

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

  it("should handle API errors gracefully in fetchTopCryptos", async () => {
    const { fetchTopCryptos } = await import("../../../src/services/coingecko");

    (axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("API unreachable")
    );

    await expect(fetchTopCryptos()).rejects.toThrow("Unknown Error");
  });

  it("should return price history as PricePoint array", async () => {
    const { fetchPriceHistory } = await import(
      "../../../src/services/coingecko"
    );

    const mockPrices: [number, number][] = [
      [1700000000000, 42000.12345],
      [1700086400000, 43000.67891],
    ];

    (axios.get as jest.Mock).mockResolvedValue({
      data: { prices: mockPrices },
    });

    const result = await fetchPriceHistory("bitcoin");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("date");
    expect(result[0]).toHaveProperty("value");
    expect(result[0].value).toBe(42000.12);
  });

  it("should handle errors in fetchPriceHistory gracefully", async () => {
    const { fetchPriceHistory } = await import(
      "../../../src/services/coingecko"
    );

    (axios.get as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Network error")
    );

    await expect(fetchPriceHistory("bitcoin")).rejects.toThrow(
      "Failed to fetch price history"
    );
  });
});
