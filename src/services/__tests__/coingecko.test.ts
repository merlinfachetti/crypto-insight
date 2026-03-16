import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios");

const mockedGet = axios.get as unknown as ReturnType<typeof vi.fn>;

describe("CoinGecko Service (backend-first with fallback)", () => {
  beforeEach(() => {
    vi.resetModules();
    mockedGet.mockReset();
  });

  it("should return coins from backend on first call", async () => {
    const { fetchTopCryptos } = await import("../../../src/services/coingecko");

    const mockData = [
      { id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "url",
        current_price: 50000, market_cap: 1000000000, price_change_percentage_24h: 2.5 },
    ];

    mockedGet.mockResolvedValue({ data: mockData });

    const result = await fetchTopCryptos();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("id");
    // Should have called /api/coins (backend)
    expect(mockedGet).toHaveBeenCalledTimes(1);
  });

  it("should fallback to CoinGecko direct when backend fails", async () => {
    const { fetchTopCryptos } = await import("../../../src/services/coingecko");

    const fallbackData = [
      { id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "url",
        current_price: 50000, market_cap: 1000000000, price_change_percentage_24h: 2.5 },
    ];

    // First call (backend) fails, second call (CoinGecko direct) succeeds
    mockedGet
      .mockRejectedValueOnce(new Error("Backend unavailable"))
      .mockResolvedValueOnce({ data: fallbackData });

    const result = await fetchTopCryptos();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].id).toBe("bitcoin");
    expect(mockedGet).toHaveBeenCalledTimes(2);
  });

  it("should throw only when both backend and CoinGecko fail", async () => {
    const { fetchTopCryptos } = await import("../../../src/services/coingecko");

    mockedGet
      .mockRejectedValueOnce(new Error("Backend down"))
      .mockRejectedValueOnce(new Error("CoinGecko down"));

    await expect(fetchTopCryptos()).rejects.toThrow(
      "Failed to fetch cryptocurrencies"
    );
  });

  it("should return price history from backend on first call", async () => {
    const { fetchPriceHistory } = await import("../../../src/services/coingecko");

    const mockPoints = [
      { date: "3/10/2026", value: 42000.12 },
      { date: "3/11/2026", value: 43000.68 },
    ];

    mockedGet.mockResolvedValue({ data: mockPoints });

    const result = await fetchPriceHistory("bitcoin");
    expect(result.length).toBe(2);
    expect(result[0].value).toBe(42000.12);
  });

  it("should fallback to CoinGecko direct for price history", async () => {
    const { fetchPriceHistory } = await import("../../../src/services/coingecko");

    const mockPrices: [number, number][] = [
      [1700000000000, 42000.12345],
      [1700086400000, 43000.67891],
    ];

    mockedGet
      .mockRejectedValueOnce(new Error("Backend unavailable"))
      .mockResolvedValueOnce({ data: { prices: mockPrices } });

    const result = await fetchPriceHistory("bitcoin");
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("date");
    expect(result[0].value).toBe(42000.12);
  });

  it("should throw only when both fail for price history", async () => {
    const { fetchPriceHistory } = await import("../../../src/services/coingecko");

    mockedGet
      .mockRejectedValueOnce(new Error("Backend down"))
      .mockRejectedValueOnce(new Error("CoinGecko down"));

    await expect(fetchPriceHistory("bitcoin")).rejects.toThrow(
      "Failed to fetch price history"
    );
  });
});
