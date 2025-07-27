import { useCryptoStore } from "../store/cryptoStore";

interface FavoriteToggleProps {
  coinId: string;
}

export function FavoriteToggle({ coinId }: FavoriteToggleProps) {
  const { favorites, toggleFavorite, consentGiven } = useCryptoStore();
  const isFavorited = favorites.includes(coinId);

  if (!consentGiven) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(coinId);
      }}
      className="ml-2 text-xl focus:outline-none hover:scale-110 transition-transform"
      aria-label="Toggle Favorite"
    >
      {isFavorited ? "⭐" : "☆"}
    </button>
  );
}
