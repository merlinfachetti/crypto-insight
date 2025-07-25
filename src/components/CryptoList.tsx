// src/components/CryptoList.tsx
import React, { useEffect } from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { sortCryptos } from "../utils/sortCryptos";

const CryptoList: React.FC = () => {
  const {
    cryptos,
    isLoading,
    error,
    loadCryptos,
    sortBy,
    favorites,
    toggleFavorite,
    consentGiven,
  } = useCryptoStore();

  useEffect(() => {
    loadCryptos();
  }, [loadCryptos]);

  const sorted = sortCryptos(cryptos, sortBy);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {isLoading && (
        <p className="text-gray-500 text-center col-span-full">
          Carregando criptomoedas...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center col-span-full">
          Erro ao carregar os dados: {error}
        </p>
      )}
      {!isLoading && sorted.length === 0 && (
        <p className="text-gray-500 text-center col-span-full">
          Nenhuma criptomoeda disponível no momento.
        </p>
      )}

      {!isLoading &&
        sorted.map((coin) => {
          const isFav = favorites.includes(coin.id);

          return (
            <div
              key={coin.id}
              className="border p-4 rounded shadow bg-white relative transition-transform hover:scale-[1.01]"
            >
              {consentGiven && (
                <button
                  onClick={() => toggleFavorite(coin.id)}
                  className={`absolute top-2 right-2 text-xl transition-colors duration-200 focus:outline-none ${
                    isFav
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                  aria-label={`Marcar ${coin.name} como favorito`}
                >
                  ★
                </button>
              )}

              <div className="flex items-center space-x-4">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold">{coin.name}</h3>
                  <p className="text-sm text-gray-500 uppercase">
                    {coin.symbol}
                  </p>
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
          );
        })}
    </div>
  );
};

export default CryptoList;
