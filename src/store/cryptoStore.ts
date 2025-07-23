// src/store/cryptoStore.ts
import { create } from "zustand";

// Global state to manage selected cryptocurrency and filters
type State = {
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
};

export const useCryptoStore = create<State>((set) => ({
  selectedCoin: "",
  setSelectedCoin: (coin) => set({ selectedCoin: coin }),
}));
