// src/components/CryptoList.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { sortCryptos } from "../utils/sortCryptos";
import { getBadgeLabel } from "../utils/getBadgeLabel";
import { formatPrice } from "../utils/formatCurrency";
import { Skeleton } from "./ui/skeleton";
import { useCryptoStore } from "../store/cryptoStore";
import Badge from "./Badge";

interface CryptoListProps {
  onOpenDetail?: () => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ onOpenDetail }) => {
  const { t } = useTranslation();
  const {
    cryptos,
    isLoading,
    error,
    sortBy,
    currency,
    favorites,
    toggleFavorite,
    consentGiven,
    setSelectedCoin,
    selectedCoin,
  } = useCryptoStore();

  const sorted = sortCryptos(cryptos, sortBy);

  if (error) {
    return (
      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded col-span-full">
        Failed to load cryptocurrencies: {error}
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
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t("dashboard.no_data")}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {t("dashboard.retry")}
          </button>
        </div>
      ) : (
        sorted.map((coin) => {
          const isFav = favorites.includes(coin.id);
          const isSelected = selectedCoin === coin.id;
          const price = coin.current_price ?? 0;
          const change = coin.price_change_percentage_24h ?? 0;
          const badge = getBadgeLabel(change);
          const badgeType = change >= 0 ? "positive" : "negative";

          return (
            <div
              key={coin.id}
              onClick={() => setSelectedCoin(coin.id)}
              className={`relative border p-4 rounded-xl shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all cursor-pointer group
                ${isSelected
                  ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-300 dark:ring-blue-700"
                  : "border-gray-200 dark:border-gray-700"
                }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {coin.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                {consentGiven?.accepted && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(coin.id);
                    }}
                    className={`text-2xl transition-all ${
                      isFav
                        ? "text-yellow-500 scale-110"
                        : "text-gray-300 dark:text-gray-600 hover:text-yellow-400"
                    }`}
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                )}
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(price, currency)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      change >= 0
                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400"
                    }`}
                  >
                    {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
                  </span>
                </div>

                {badge && (
                  <div className="mt-2">
                    <Badge label={badge} type={badgeType} />
                  </div>
                )}
              </div>

              {/* Details button — appears on hover/selected */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCoin(coin.id);
                  onOpenDetail?.();
                }}
                className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded-lg font-medium transition-all
                  bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400
                  hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white
                  opacity-0 group-hover:opacity-100 ${isSelected ? "opacity-100" : ""}`}
                aria-label={`View details for ${coin.name}`}
              >
                {t("details_btn")}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CryptoList;
