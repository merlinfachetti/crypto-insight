// src/store/languageStore.ts
// Persists the user's language preference across sessions.
// Syncs with i18n.changeLanguage() on initialization and on change.

import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n";

type Language = "en" | "pt";

type State = {
  language: Language;
};

type Actions = {
  setLanguage: (lang: Language) => void;
};

export const useLanguageStore = create<State & Actions>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: "language-store",
      onRehydrateStorage: () => (state) => {
        // On page load, sync i18n with the persisted language
        if (state?.language) {
          i18n.changeLanguage(state.language);
        }
      },
    }
  )
);
