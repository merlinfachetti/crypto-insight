// src/store/cryptoStore.ts
import { create } from "zustand";
import { fetchTopCryptos } from "../services/coingecko";
import type { CryptoCurrency } from "../types/crypto";

type SortOption = "price" | "performance" | "name";

type State = {
  cryptos: CryptoCurrency[];
  isLoading: boolean;
  error: string | null;
  sortBy: SortOption;
  currency: string;
  setSortBy: (value: SortOption) => void;
  setCurrency: (c: string) => void;
  loadCryptos: () => Promise<void>;
};

export const useCryptoStore = create<State>((set, get) => ({
  cryptos: [],
  isLoading: false,
  error: null,
  sortBy: "performance",
  currency: "usd",
  setSortBy: (value) => set({ sortBy: value }),
  setCurrency: (currency) => set({ currency }),

  loadCryptos: async () => {
    set({ isLoading: true, error: null });

    try {
      const { currency } = get();
      const data = await fetchTopCryptos(currency);
      set({ cryptos: data });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
      } else {
        set({ error: "Failed to load cryptos" });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
