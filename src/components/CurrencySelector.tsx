// src/components/CurrencySelector.tsx
import React from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { useTranslation } from "react-i18next";

const currencies = [
  { value: "usd", label: "USD — US Dollar" },
  { value: "eur", label: "EUR — Euro" },
  { value: "brl", label: "BRL — Brazilian Real" },
] as const;

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, loadCryptos } = useCryptoStore();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    loadCryptos();
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <label
        htmlFor="currency-select"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {t("select_currency")}:
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        {currencies.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
