// src/pages/Home.tsx
import React, { useEffect } from "react";
import CryptoList from "../components/CryptoList";
import CryptoFilter from "../components/CryptoFilter";
import CurrencySelector from "../components/CurrencySelector";
import PriceChart from "../components/PriceChart";
import { ConsentSettings } from "../components/ConsentSettings";
import { ApiFallback } from "@/components/ApiFallback";
import { useCryptoStore } from "@/store/cryptoStore";

const Home: React.FC = () => {
  const { isLoading, error, loadCryptos } = useCryptoStore();

  useEffect(() => {
    loadCryptos();
  }, [loadCryptos]);

  if (error) return <ApiFallback retryFn={loadCryptos} />;

  if (isLoading) {
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
        <CryptoList />
        <PriceChart />
        <ConsentSettings />
      </div>
    </section>
  );
};

export default Home;
