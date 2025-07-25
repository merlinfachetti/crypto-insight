// src/store/cryptoStore.ts
import { create } from "zustand";
import { fetchTopCryptos } from "../services/coingecko";
import type { CryptoCurrency } from "../types/crypto";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";

type SortOption = "price" | "performance" | "name";

type State = {
  cryptos: CryptoCurrency[];
  isLoading: boolean;
  error: string | null;
  sortBy: SortOption;
  currency: string;
  favorites: string[];
  consentGiven: boolean;

  // Defina consentGiven como true no estado inicial
  // consentGiven: true; // ← Isso ativa favoritos sem precisar do popup (somente em DEV)

  setConsentGiven: (value: boolean) => void;
  toggleFavorite: (id: string) => void;
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
  favorites: [],
  consentGiven: false,

  setConsentGiven: (value) => {
    set({ consentGiven: value });

    if (value) {
      const loaded = loadFromLocal<string[]>("favorites") || [];
      set({ favorites: loaded });
    }
  },

  toggleFavorite: (id) => {
    const { favorites, consentGiven } = get();
    if (!consentGiven) return;

    const isFav = favorites.includes(id);
    const updated = isFav
      ? favorites.filter((coin) => coin !== id)
      : [...favorites, id];

    set({ favorites: updated });
    saveToLocal("favorites", updated);
  },

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
    }
  },
}));
