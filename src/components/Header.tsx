import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ui/ThemeToggle";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/favorites", label: "Favorites" },
  { to: "/about", label: "About" },
] as const;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <img src="/logo.png" alt="CryptoInsight Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2 animate-fade-down border-t border-gray-100 dark:border-gray-700">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
