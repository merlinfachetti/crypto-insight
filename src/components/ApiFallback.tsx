// src/components/ApiFallback.tsx
import { useEffect, useState } from "react";

interface ApiFallbackProps {
  retryFn: () => void;
  retryDelay?: number;
}

export function ApiFallback({ retryFn, retryDelay = 10000 }: ApiFallbackProps) {
  const [countdown, setCountdown] = useState(Math.round(retryDelay / 1000));
  const [retried, setRetried] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      setRetried(true);
      retryFn();
    }, retryDelay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [retryFn, retryDelay]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-5xl mb-4">📡</span>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Unable to reach the API
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        CoinGecko's free tier has rate limits. The request may have been
        throttled — retrying automatically.
      </p>

      {!retried ? (
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500" />
          Retrying in {countdown}s…
        </div>
      ) : (
        <button
          onClick={retryFn}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Retry now
        </button>
      )}
    </div>
  );
}
