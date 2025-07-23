// src/pages/Home.tsx
import React from "react";
import CryptoList from "../components/CryptoList";

const Home: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Top 10 Cryptocurrencies</h2>
      <CryptoList />
    </section>
  );
};

export default Home;
