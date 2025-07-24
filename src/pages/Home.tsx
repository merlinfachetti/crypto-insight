import React from "react";
import CryptoList from "../components/CryptoList";
import CryptoFilter from "../components/CryptoFilter";
import CurrencySelector from "../components/CurrencySelector";

const Home: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Top 10 Cryptocurrencies</h2>
      <CurrencySelector />
      <CryptoFilter />
      <CryptoList />
    </section>
  );
};

export default Home;
