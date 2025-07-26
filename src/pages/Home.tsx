import React from "react";
import CryptoList from "../components/CryptoList";
import CryptoFilter from "../components/CryptoFilter";
import CurrencySelector from "../components/CurrencySelector";
import PriceChart from "../components/PriceChart";

const Home: React.FC = () => {
  return (
    <section>
      <div className="min-h-screen bg-gray-100 text-gray-900 px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">Top 10 Cryptocurrencies</h2>
        <CurrencySelector />
        <CryptoFilter />
        <CryptoList />
        <PriceChart />
      </div>
    </section>
  );
};

export default Home;
