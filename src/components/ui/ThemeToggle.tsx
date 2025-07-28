import React from "react";
import { useThemeStore } from "@/store/themeStore";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative w-14 h-8 rounded-full flex items-center justify-between px-1
        transition-colors duration-300 focus:outline-none shadow-md
        ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
    >
      {/* Moon icon */}
      <span className="flex items-center justify-center w-6 h-6 text-yellow-500 text-sm z-10">
        🌙
      </span>

      {/* Sun icon */}
      <span className="flex items-center justify-center w-6 h-6 text-yellow-400 text-sm z-10">
        ☀️
      </span>

      {/* Thumb */}
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white transition-transform duration-300
          ${isDark ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
};

export default ThemeToggle;
