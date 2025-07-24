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
  setSortBy: (value: SortOption) => void;
  loadCryptos: () => Promise<void>;
};

export const useCryptoStore = create<State>((set) => ({
  cryptos: [],
  isLoading: false,
  error: null,
  sortBy: "performance",
  setSortBy: (value) => set({ sortBy: value }),

  loadCryptos: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await fetchTopCryptos();
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
