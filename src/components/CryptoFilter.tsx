import React from "react";
import { useCryptoStore } from "../store/cryptoStore";

const sortOptions = [
  { value: "performance", label: "Performance (24h)" },
  { value: "price", label: "Price (USD)" },
  { value: "name", label: "Name (A-Z)" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

const CryptoFilter: React.FC = () => {
  const { sortBy, setSortBy } = useCryptoStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as SortOption;
    setSortBy(selected);
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-center">
      <label htmlFor="sort-select" className="font-medium">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={handleChange}
        className="border px-3 py-1 rounded shadow-sm"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CryptoFilter;
