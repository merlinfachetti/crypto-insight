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
    retry(); // Fetch market data on component mount
  }, [retry]);

  if (error) return <ApiFallback retryFn={retry} />;
  if (loading || !data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <p className="text-lg">Carregando dados das criptomoedas...</p>
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto" />
        </div>
      </div>
    );

  return (
    <section>
      <div className="min-h-screen bg-gray-100 text-gray-900 px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">Top 10 Cryptocurrencies</h2>
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
