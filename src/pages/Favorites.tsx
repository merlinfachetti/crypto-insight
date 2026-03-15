// src/pages/Favorites.tsx
import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useCryptoStore } from "../store/cryptoStore";
import { formatPrice } from "../utils/formatCurrency";
import CoinDetailDrawer from "../components/CoinDetailDrawer";

const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const {
    cryptos,
    favorites,
    toggleFavorite,
    consentGiven,
    currency,
    setSelectedCoin,
  } = useCryptoStore();

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!consentGiven?.accepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <span className="text-5xl mb-4">🔒</span>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {t("favorites.locked_title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          {t("favorites.locked_description")}
        </p>
        <Link to="/dashboard"
          className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
          {t("favorites.go_dashboard")}
        </Link>
      </div>
    );
  }

  const favoritedCoins = cryptos.filter((coin) => favorites.includes(coin.id));

  if (favoritedCoins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <span className="text-5xl mb-4">☆</span>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {t("favorites.empty_title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          {t("favorites.empty_description")}
        </p>
        <Link to="/dashboard"
          className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
          {t("favorites.browse")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("favorites.title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {t(`favorites.count_${favoritedCoins.length === 1 ? "one" : "other"}`, {
            count: favoritedCoins.length,
          })}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritedCoins.map((coin) => {
            const change = coin.price_change_percentage_24h ?? 0;
            const price = coin.current_price ?? 0;
            const isPositive = change >= 0;

            return (
              <div key={coin.id}
                className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white leading-tight">{coin.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleFavorite(coin.id)}
                    className="text-yellow-500 hover:text-gray-300 dark:hover:text-gray-600 text-2xl transition-colors"
                    aria-label="Remove from favorites">★</button>
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(price, currency)}
                  </span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    isPositive
                      ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400"
                  }`}>
                    {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
                  </span>
                </div>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("favorites.market_cap")}:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {formatPrice(coin.market_cap, currency)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {t("favorites.rank")}:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    #{coin.market_cap_rank}
                  </span>
                </p>

                <button
                  onClick={() => { setSelectedCoin(coin.id); setDrawerOpen(true); }}
                  className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded-lg font-medium transition-all
                    bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400
                    hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white
                    opacity-0 group-hover:opacity-100"
                  aria-label={`View details for ${coin.name}`}
                >
                  {t("details_btn")}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <CoinDetailDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Favorites;
