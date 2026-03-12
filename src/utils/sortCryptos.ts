// src/utils/sortCryptos.ts
import type { Coin } from "../types/coin";

export const sortCryptos = (
  data: Coin[],
  by: "price" | "performance" | "name"
): Coin[] => {
  const clone = [...data];

  switch (by) {
    case "price":
      return clone.sort((a, b) => b.current_price - a.current_price);
    case "performance":
      return clone.sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
    case "name":
      return clone.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return data;
  }
};
