/**
 * 🌐 UI Header Component
 *
 * This component is a **pure UI header**, responsible only for visual presentation.
 * It lives in `components/ui/` because:
 *
 * - It handles simple elements like logo/title and the theme toggle.
 * - It does not deal with routing, user sessions, API logic, or global state (besides UI-related Zustand).
 *
 * ✅ Difference from an "App Header":
 * - An **App Header** (e.g. in `layout/` or `pages/`) may include navigation links,
 *   user login status, route awareness, language selectors, etc.
 * - A **UI Header** like this is just a **visual block**, which can be reused across pages.
 *
 * ❌ Do not add business logic, data fetching, or routing here.
 * 🎯 Follow Separation of Concerns (SoC) for clean and scalable architecture.
 */

import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        CryptoInsight
      </h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
