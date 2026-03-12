// src/pages/Home.tsx
import React, { useEffect } from "react";
import CryptoList from "../components/CryptoList";
import CryptoFilter from "../components/CryptoFilter";
import CurrencySelector from "../components/CurrencySelector";
import PriceChart from "../components/PriceChart";
import { ConsentSettings } from "../components/ConsentSettings";
import { useApiStatus } from "@/hooks/useApiStatus";
import { fetchTopCryptos } from "@/services/coingecko";
import { ApiFallback } from "@/components/ApiFallback";
import type { Coin } from "@/types/coin";

const Home: React.FC = () => {
  const { loading, error, data, retry } = useApiStatus<Coin[]>(fetchTopCryptos);

  useEffect(() => {
    retry();
  }, [retry]);

  if (error) return <ApiFallback retryFn={retry} />;

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-900 dark:text-white">
        <div className="text-center">
          <p className="text-lg">Loading cryptocurrency data...</p>
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-white mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="py-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Top 10 Cryptocurrencies
        </h2>
        <CurrencySelector />
        <CryptoFilter />
        <CryptoList coins={data} />
        <PriceChart />
        <ConsentSettings />
      </div>
    </section>
  );
};

export default Home;
