// src/store/cryptoStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchTopCryptos, fetchPriceHistory } from "../services/coingecko";
import type { CryptoCurrency } from "../types/crypto";
import type { PricePoint } from "../types/chart";

type SortOption = "price" | "performance" | "name";

type State = {
  cryptos: CryptoCurrency[];
  isLoading: boolean;
  error: string | null;
  sortBy: SortOption;
  currency: string;
  favorites: string[];
  consentGiven: boolean;
  priceHistory: PricePoint[];
  selectedCoin: string | null;
};

type Actions = {
  setConsentGiven: (value: boolean) => void;
  toggleFavorite: (id: string) => void;
  setSortBy: (value: SortOption) => void;
  setCurrency: (c: string) => void;
  setSelectedCoin: (id: string) => void;
  loadPriceHistory: () => Promise<void>;
  loadCryptos: () => Promise<void>;
};

export const useCryptoStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cryptos: [],
      isLoading: false,
      error: null,
      sortBy: "performance",
      currency: "usd",
      favorites: [],
      consentGiven: null,
      priceHistory: [],
      selectedCoin: null,

      setConsentGiven: (value) => set({ consentGiven: value }),

      toggleFavorite: (id) => {
        const { consentGiven } = get();
        if (!consentGiven) return;

        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((coin) => coin !== id)
            : [...state.favorites, id],
        }));
      },

      setSortBy: (value) => set({ sortBy: value }),
      setCurrency: (currency) => set({ currency }),

      setSelectedCoin: (id) => {
        set({ selectedCoin: id });
        get().loadPriceHistory();
      },

      loadPriceHistory: async () => {
        const { selectedCoin, currency } = get();
        if (!selectedCoin) return;

        try {
          const history = await fetchPriceHistory(selectedCoin, currency);
          set({ priceHistory: history });
        } catch (err) {
          if (err instanceof Error) {
            console.error("Failed to fetch price history:", err.message);
          } else {
            console.error("Unknown error while fetching price history.");
          }
        }
      },

      loadCryptos: async () => {
        set({ isLoading: true, error: null });

        try {
          const { currency } = get();
          const data = await fetchTopCryptos(currency);
          set({ cryptos: data });
        } catch (err) {
          set({
            error:
              err instanceof Error
                ? err.message
                : "Failed to load cryptocurrencies",
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "crypto-store",
      partialize: (state) => ({
        favorites: state.favorites,
        consentGiven: state.consentGiven,
        currency: state.currency,
        sortBy: state.sortBy,
      }),
    }
  )
);
