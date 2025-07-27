import React, { useEffect } from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { sortCryptos } from "../utils/sortCryptos";
import { Skeleton } from "./ui/skeleton";

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
    setSelectedCoin,
  } = useCryptoStore();

  useEffect(() => {
    loadCryptos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sorted = sortCryptos(cryptos, sortBy);

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 text-red-600 rounded col-span-full">
        Erro ao carregar criptomoedas: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg" />
        ))
      ) : sorted.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 text-lg">
            Nenhuma criptomoeda disponível no momento.
          </p>
          <button
            onClick={loadCryptos}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        sorted.map((coin) => {
          const isFav = favorites.includes(coin.id);
          const price = coin.current_price ?? 0;
          const change = coin.price_change_percentage_24h ?? 0;

          return (
            <div
              key={coin.id}
              className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelectedCoin(coin.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{coin.name}</h3>
                    <p className="text-sm text-gray-500 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                {consentGiven && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(coin.id);
                    }}
                    className={`text-2xl transition-all ${
                      isFav
                        ? "text-yellow-500 scale-110"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                    aria-label={
                      isFav
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold">
                    $
                    {price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      change >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CryptoList;
