// tests/utils/sortCryptos.test.ts
import { sortCryptos } from "../../src/utils/sortCryptos";
import type { CryptoCurrency } from "../types/crypto";

const mockData = [
  { name: "Bitcoin", current_price: 50000, price_change_percentage_24h: 2 },
  { name: "Ethereum", current_price: 3000, price_change_percentage_24h: -1 },
  { name: "Cardano", current_price: 2, price_change_percentage_24h: 10 },
] as CryptoCurrency[];

test("sorts by price descending", () => {
  const sorted = sortCryptos(mockData, "price");
  expect(sorted[0].name).toBe("Bitcoin");
});

test("sorts by performance descending", () => {
  const sorted = sortCryptos(mockData, "performance");
  expect(sorted[0].name).toBe("Cardano");
});

test("sorts by name alphabetically", () => {
  const sorted = sortCryptos(mockData, "name");
  expect(sorted[0].name).toBe("Bitcoin");
});
