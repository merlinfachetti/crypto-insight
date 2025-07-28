import { create } from "zustand";
import { loadTheme, saveTheme } from "@/utils/themeStorage";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const theme = loadTheme();
  const root =
    typeof document !== "undefined" ? document.documentElement : null;

  if (root) root.classList.add(theme);

  return {
    theme,
    toggleTheme: () => {
      const current = get().theme;
      const next = current === "light" ? "dark" : "light";

      saveTheme(next);
      if (root) {
        root.classList.remove(current);
        root.classList.add(next);
      }

      set({ theme: next });
    },
  };
});
