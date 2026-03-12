// src/pages/Landing.tsx
import React from "react";
import { Link } from "@tanstack/react-router";

interface ConceptCardProps {
  icon: string;
  title: string;
  description: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
    <span className="text-3xl mb-3 block">{icon}</span>
    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </div>
);

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white text-sm">{question}</span>
        <span className="text-gray-400 ml-4 shrink-0 text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

const Landing: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">

      {/* Hero */}
      <section className="text-center py-16 px-4">
        <span className="inline-block text-5xl mb-6">₿</span>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Understand crypto{" "}
          <span className="text-blue-500">from zero.</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          CryptoInsight is a free educational platform that helps beginners
          explore the world of cryptocurrencies — with real market data, plain
          language explanations and no financial hype.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-md"
          >
            Open Dashboard →
          </Link>
          <a
            href="#learn"
            className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
          >
            Learn the basics ↓
          </a>
        </div>
      </section>

      {/* What is crypto */}
      <section id="learn" className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          What is cryptocurrency?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          A cryptocurrency is a form of{" "}
          <strong className="text-gray-800 dark:text-gray-200">digital money</strong>{" "}
          that exists only online. Unlike the dollar or the euro, no government
          or bank controls it. Instead, it runs on a technology called{" "}
          <strong className="text-gray-800 dark:text-gray-200">blockchain</strong> — a
          public, tamper-proof record book maintained by thousands of computers
          around the world simultaneously.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Bitcoin was the first cryptocurrency, created in 2009. Since then,
          thousands of others have emerged — each with different goals,
          technologies and communities. Some aim to be digital cash, others
          power smart contracts or decentralized applications.
        </p>
      </section>

      {/* Core concepts */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Core concepts
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          The essential ideas you need to follow the crypto world.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ConceptCard
            icon="⛓️"
            title="Blockchain"
            description="A chain of data blocks where every transaction ever made is permanently recorded. No single entity controls it — the record is shared and verified by thousands of computers globally."
          />
          <ConceptCard
            icon="💎"
            title="Bitcoin (BTC)"
            description="The original cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. Often called 'digital gold', Bitcoin has a fixed supply of 21 million coins."
          />
          <ConceptCard
            icon="🔷"
            title="Ethereum (ETH)"
            description="A programmable blockchain that allows developers to build decentralized applications (dApps). Its native currency is Ether. Think of it as a global computer, not just money."
          />
          <ConceptCard
            icon="🔑"
            title="Wallet"
            description="A digital tool that stores your private keys — the passwords that prove ownership of your crypto. Wallets don't actually store coins, just the access credentials."
          />
          <ConceptCard
            icon="📊"
            title="Market Cap"
            description="Current price × circulating supply. It measures the total market value of a cryptocurrency, similar to how we measure the size of a company on the stock market."
          />
          <ConceptCard
            icon="💧"
            title="Liquidity & Volume"
            description="Volume is how much of a coin was traded in 24 hours. High volume = high liquidity = easier to buy and sell without moving the price drastically."
          />
          <ConceptCard
            icon="⛏️"
            title="Mining"
            description="The process by which new Bitcoin transactions are verified and added to the blockchain. Miners compete to solve a cryptographic puzzle — the winner adds the next block and earns a reward."
          />
          <ConceptCard
            icon="🏦"
            title="Decentralization"
            description="No single authority controls a decentralized network. This removes the need to trust a bank or government — the rules are enforced by code and consensus, not institutions."
          />
        </div>
      </section>

      {/* How to read market data */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          How to read market data
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          When you open the dashboard, you'll see live data for the top 10
          cryptocurrencies. Here's what each number means:
        </p>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {[
            { term: "Price", def: "The current value of 1 unit of that coin in your selected currency (USD, EUR or BRL)." },
            { term: "24h Change", def: "How much the price moved in the last 24 hours, shown as a percentage. Green = went up, Red = went down." },
            { term: "Market Cap", def: "Price × total circulating supply. The bigger the market cap, the more established the coin is considered." },
            { term: "Volume (24h)", def: "Total value traded in the last day. High volume means more people are actively buying and selling." },
            { term: "7-Day Chart", def: "A visual of the price over the past week. Helps spot short-term trends — is it recovering? Crashing? Stable?" },
            { term: "ATH / ATL", def: "All-Time High and All-Time Low — the highest and lowest prices ever recorded for that coin." },
          ].map(({ term, def }, i, arr) => (
            <div
              key={term}
              className={`flex flex-col sm:flex-row gap-1 sm:gap-4 px-5 py-4 ${
                i !== arr.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""
              }`}
            >
              <span className="shrink-0 w-32 text-sm font-semibold text-blue-500">
                {term}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{def}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Important disclaimer */}
      <section className="py-8 px-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-5">
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
            ⚠️ This is not financial advice
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-500 leading-relaxed">
            CryptoInsight is an educational tool only. The data shown is for
            informational purposes. Cryptocurrency markets are highly volatile —
            prices can drop dramatically in hours. Never invest more than you
            can afford to lose, and always do your own research before making
            any financial decision.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          <FaqItem
            question="Is crypto real money?"
            answer="It depends on how you define 'real'. Crypto is a legitimate asset that can be bought, sold and used for transactions. However, unlike government-issued currencies, it has no legal tender status in most countries and its value is determined entirely by supply and demand."
          />
          <FaqItem
            question="How do I buy cryptocurrency?"
            answer="Through a centralized exchange like Coinbase, Binance or Kraken. You create an account, verify your identity, deposit money and then purchase the coin you want. CryptoInsight is not an exchange and cannot help you buy crypto — we only show data."
          />
          <FaqItem
            question="Why do prices change so much?"
            answer="Crypto markets are global, operate 24/7 and have relatively small market caps compared to traditional assets. This makes them highly sensitive to news, regulation announcements, large trades and market sentiment."
          />
          <FaqItem
            question="What's the difference between Bitcoin and Ethereum?"
            answer="Bitcoin was designed primarily as digital money and a store of value. Ethereum is a programmable platform — it can run smart contracts and decentralized applications. Both are leading cryptocurrencies but serve different purposes."
          />
          <FaqItem
            question="Is crypto safe?"
            answer="The underlying blockchain technology is cryptographically secure. The risks come from human factors: losing your private keys, using fraudulent exchanges, falling for scams or making uninformed investment decisions. Knowledge and caution are your best tools."
          />
          <FaqItem
            question="What is this platform for?"
            answer="CryptoInsight is a free educational tool built to help beginners understand crypto through real data. It is not a wallet, exchange or financial advisor. All data comes from the CoinGecko public API."
          />
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Ready to explore the market?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Live data for the top 10 cryptocurrencies by market cap.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-md"
        >
          Open Dashboard →
        </Link>
      </section>

    </div>
  );
};

export default Landing;
