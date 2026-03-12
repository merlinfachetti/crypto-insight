// src/components/CryptoFilter.tsx
import React from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { useTranslation } from "react-i18next";

const sortOptions = [
  { value: "performance", labelKey: "performance" },
  { value: "price",       labelKey: "price" },
  { value: "name",        labelKey: "name" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

const CryptoFilter: React.FC = () => {
  const { sortBy, setSortBy } = useCryptoStore();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <label
        htmlFor="sort-select"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {t("sort_by")}:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={handleChange}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        {sortOptions.map(({ value, labelKey }) => (
          <option key={value} value={value}>
            {t(labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CryptoFilter;
