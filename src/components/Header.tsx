import { Link } from "@tanstack/react-router";

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="CryptoInsight Logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Favorites
          </Link>
          <Link
            to="/about"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
