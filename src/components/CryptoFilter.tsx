// src/components/CryptoFilter.tsx
import React from "react";
import { useCryptoStore } from "../store/cryptoStore";

const CryptoFilter: React.FC = () => {
  const { sortBy, setSortBy } = useCryptoStore();

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <label className="font-medium">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as any)}
        className="border px-3 py-1 rounded shadow-sm"
      >
        <option value="performance">Performance (24h)</option>
        <option value="price">Price (USD)</option>
        <option value="name">Name (A-Z)</option>
      </select>
    </div>
  );
};

export default CryptoFilter;
