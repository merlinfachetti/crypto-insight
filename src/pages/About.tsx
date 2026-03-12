// src/pages/About.tsx
import React from "react";
import { Link } from "@tanstack/react-router";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
      {title}
    </h2>
    {children}
  </div>
);

const StackBadge: React.FC<{ label: string; description: string }> = ({
  label,
  description,
}) => (
  <div className="flex items-start gap-3 py-2">
    <span className="shrink-0 mt-0.5 text-xs font-mono font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
      {label}
    </span>
    <span className="text-sm text-gray-600 dark:text-gray-400">{description}</span>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="py-6 max-w-2xl">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          About CryptoInsight
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          CryptoInsight is an open-source educational platform for exploring
          cryptocurrency market data. It is built to help beginners understand
          the crypto ecosystem through real data, clean visualizations and
          straightforward information — without noise, hype or financial advice.
        </p>
      </div>

      {/* What it is and isn't */}
      <Section title="What this platform is">
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {[
            "A dashboard for visualizing real-time market data for the top 10 cryptocurrencies by market cap",
            "An educational tool for people who want to understand crypto without being overwhelmed",
            "A portfolio project demonstrating modern frontend engineering practices",
            "Powered entirely by public APIs — no server, no backend, no accounts required",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 text-green-500 dark:text-green-400 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>

        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mt-4">
          {[
            "Not a crypto exchange, wallet or trading platform",
            "Not a source of financial or investment advice",
            "Not affiliated with any cryptocurrency project",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 text-red-400 dark:text-red-500 shrink-0">✗</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Data source */}
      <Section title="Data source">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          All market data is fetched live from the{" "}
          <a
            href="https://www.coingecko.com/en/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
          >
            CoinGecko public API
          </a>
          . CoinGecko is one of the largest independent cryptocurrency data
          aggregators, tracking over 10,000 coins across 700+ exchanges. Prices
          and market data are updated in real time on their end.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Note: The free tier of the CoinGecko API has rate limits. If data
          fails to load, wait a moment and retry.
        </p>
      </Section>

      {/* Tech stack */}
      <Section title="Tech stack">
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <StackBadge label="React 19"      description="UI library — component-based architecture" />
          <StackBadge label="TypeScript"    description="Static typing throughout the entire codebase" />
          <StackBadge label="Vite"          description="Build tool and dev server" />
          <StackBadge label="Tailwind CSS"  description="Utility-first styling with dark mode support" />
          <StackBadge label="Zustand"       description="Lightweight global state management" />
          <StackBadge label="Recharts"      description="Composable charting library built on D3" />
          <StackBadge label="TanStack Router" description="Type-safe client-side routing" />
          <StackBadge label="i18next"       description="Internationalization (EN / PT-BR)" />
          <StackBadge label="Vitest"        description="Unit testing framework" />
        </div>
      </Section>

      {/* Privacy */}
      <Section title="Privacy & data storage">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          CryptoInsight stores only three things in your browser's local
          storage: your favorite coins, your selected currency, and your theme
          preference. No personal data is collected, no analytics are run, and
          nothing is sent to any server. You can revoke storage consent at any
          time from the dashboard.
        </p>
      </Section>

      {/* Author */}
      <Section title="Author">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Designed and built by{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Alden Merlin
          </span>
          . This project is open source and intended as a reference for clean
          frontend architecture using modern React tooling.
        </p>
        <a
          href="https://github.com/merlinfachetti/crypto-insight"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          View source on GitHub
        </a>
      </Section>

      {/* CTA */}
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default About;
