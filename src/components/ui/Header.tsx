/**
 * 🌐 UI Header Component
 *
 * This component is a **pure UI header**, responsible only for visual presentation.
 * It lives in `components/ui/` because:
 *
 * - It handles simple elements like logo/title and the theme toggle.
 * - It does not deal with routing, user sessions, API logic, or global state (além do theme toggle).
 *
 * ✅ Difference from an "App Header":
 * - An App Header inclui lógica de autenticação, rotas, etc.
 * - Este UI Header é somente visual, e reutilizável em qualquer lugar.
 */

import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react"; // ícones minimalistas (lucide-react já incluso via shadcn)

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="relative bg-white dark:bg-gray-900 shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Title/Logo */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 md:ml-0">
          CryptoInsight
        </h1>

        {/* Right: Theme Toggle */}
        <div className="md:flex hidden">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2 animate-fade-down">
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-100 hover:underline"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-100 hover:underline"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block text-gray-700 dark:text-gray-100 hover:underline"
          >
            Sobre
          </a>
          <div className="pt-2">
            <ThemeToggle />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
