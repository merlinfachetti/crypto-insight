// src/store/cryptoStore.ts
import { create } from "zustand";
import { fetchTopCryptos } from "../services/coingecko";
import type { CryptoCurrency } from "../types/crypto";

type State = {
  cryptos: CryptoCurrency[];
  isLoading: boolean;
  error: string | null;
  loadCryptos: () => Promise<void>;
};

export const useCryptoStore = create<State>((set) => ({
  cryptos: [],
  isLoading: false,
  error: null,

  loadCryptos: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchTopCryptos();
      set({ cryptos: data });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erro ao carregar criptos:", err.message);
      } else {
        console.error("Erro desconhecido ao carregar criptos:", err);
      }
      set({ error: "Failed to load cryptos" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
