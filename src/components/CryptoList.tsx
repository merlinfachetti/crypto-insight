// src/components/CryptoList.tsx
import React, { useEffect } from "react";
import { useCryptoStore } from "../store/cryptoStore";

const CryptoList: React.FC = () => {
  const { cryptos, isLoading, error, loadCryptos } = useCryptoStore();

  useEffect(() => {
    loadCryptos();
  }, [loadCryptos]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cryptos.map((coin) => (
        <div key={coin.id} className="border p-4 rounded shadow bg-white">
          <div className="flex items-center space-x-4">
            <img src={coin.image} alt={coin.name} className="w-8 h-8" />
            <div>
              <h3 className="font-semibold">{coin.name}</h3>
              <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
            </div>
          </div>
          <p className="mt-2 text-lg font-bold text-green-600">
            ${coin.current_price.toFixed(2)}
          </p>
          <p
            className={`text-sm ${
              coin.price_change_percentage_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;
