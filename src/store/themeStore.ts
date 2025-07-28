import { create } from "zustand";
import { loadTheme, saveTheme } from "@/utils/themeStorage";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Applies the selected theme to the <html> element by updating its class.
 * This ensures Tailwind's dark mode (via class strategy) works correctly.
 */
const applyThemeToDOM = (theme: Theme) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
};

export const useThemeStore = create<ThemeState>((set, get) => {
  const initialTheme = loadTheme();
  applyThemeToDOM(initialTheme);

  return {
    theme: initialTheme,
    toggleTheme: () => {
      const current = get().theme;
      const next: Theme = current === "light" ? "dark" : "light";

      saveTheme(next);
      applyThemeToDOM(next);

      set({ theme: next });
    },
  };
});
