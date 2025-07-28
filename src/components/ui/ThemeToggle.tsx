import React from "react";
import { useThemeStore } from "@/store/themeStore";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="text-sm px-3 py-1 border rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
