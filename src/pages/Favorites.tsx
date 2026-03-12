// src/pages/Favorites.tsx
import React from "react";
import { Link } from "@tanstack/react-router";
import { useCryptoStore } from "../store/cryptoStore";

const Favorites: React.FC = () => {
  const { cryptos, favorites, toggleFavorite, consentGiven } = useCryptoStore();

  // Consent not given — favorites feature is locked
  if (!consentGiven?.accepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <span className="text-5xl mb-4">🔒</span>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Favorites are disabled
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          To save favorites, you need to accept data storage in the consent
          banner at the bottom of the page.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const favoritedCoins = cryptos.filter((coin) => favorites.includes(coin.id));

  // No favorites saved yet
  if (favoritedCoins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <span className="text-5xl mb-4">☆</span>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          No favorites yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          Go to the dashboard and click the star on any cryptocurrency to save
          it here.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Browse Cryptocurrencies
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Your Favorites
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {favoritedCoins.length} coin{favoritedCoins.length !== 1 ? "s" : ""} saved
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoritedCoins.map((coin) => {
          const change = coin.price_change_percentage_24h ?? 0;
          const price = coin.current_price ?? 0;
          const isPositive = change >= 0;

          return (
            <div
              key={coin.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white leading-tight">
                      {coin.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                {/* Remove from favorites */}
                <button
                  onClick={() => toggleFavorite(coin.id)}
                  className="text-yellow-500 hover:text-gray-300 dark:hover:text-gray-600 text-2xl transition-colors"
                  aria-label="Remove from favorites"
                >
                  ★
                </button>
              </div>

              {/* Price row */}
              <div className="flex items-end justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    isPositive
                      ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400"
                  }`}
                >
                  {isPositive ? "↑" : "↓"} {Math.abs(change).toFixed(2)}%
                </span>
              </div>

              {/* Market cap */}
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Market cap:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  ${coin.market_cap.toLocaleString("en-US")}
                </span>
              </p>

              {/* Rank */}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Rank:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  #{coin.market_cap_rank}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
