// src/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Logo from "./ui/Logo";

const currentYear = new Date().getFullYear();

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow px-4 py-6 w-full max-w-7xl mx-auto">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img
              src="/avatar.png"
              alt="Alden Merlin"
              className="w-5 h-5 rounded-full object-cover"
            />
            <span>
              © {currentYear}{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Alden Merlin
              </span>
              . All rights reserved.
            </span>
          </div>
          <Logo className="opacity-60 hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3">
            <span className="text-gray-400 dark:text-gray-500">
              Data by{" "}
              <a
                href="https://www.coingecko.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                CoinGecko
              </a>
            </span>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <a
              href="https://github.com/merlinfachetti/crypto-insight"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
