// src/components/ui/LanguageToggle.tsx
// Compact EN / PT toggle button for the Header.

import React from "react";
import { useLanguageStore } from "../../store/languageStore";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-0.5">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          language === "en"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        }`}
        aria-label="Switch to English"
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("pt")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          language === "pt"
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        }`}
        aria-label="Trocar para Português"
        aria-pressed={language === "pt"}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageToggle;
