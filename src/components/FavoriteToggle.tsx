import { useEffect, useState } from "react";

interface FavoriteToggleProps {
  coinId: string;
}

export function FavoriteToggle({ coinId }: FavoriteToggleProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const list = JSON.parse(stored);
      setIsFavorited(list.includes(coinId));
    }
  }, [coinId]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem("favorites");
    let updated: string[] = stored ? JSON.parse(stored) : [];

    if (updated.includes(coinId)) {
      updated = updated.filter((id) => id !== coinId);
      setIsFavorited(false);
    } else {
      updated.push(coinId);
      setIsFavorited(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <button
      onClick={toggleFavorite}
      className="ml-2 text-xl focus:outline-none hover:scale-110 transition-transform"
      aria-label="Toggle Favorite"
    >
      {isFavorited ? "⭐" : "☆"}
    </button>
  );
}
