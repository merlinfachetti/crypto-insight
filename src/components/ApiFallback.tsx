// src/components/ApiFallback.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ApiFallbackProps {
  retryFn: () => void;
  retryDelay?: number;
}

export function ApiFallback({ retryFn, retryDelay = 10000 }: ApiFallbackProps) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(Math.round(retryDelay / 1000));
  const [retried, setRetried] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    const timeout = setTimeout(() => { setRetried(true); retryFn(); }, retryDelay);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [retryFn, retryDelay]);

  return (
    <div className="flex items-center gap-3 px-4 py-3 mb-6 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
      <span className="text-xl shrink-0">📡</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
          {t("api_error.title")}
        </p>
        <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-0.5">
          {t("api_error.description")}
        </p>
      </div>
      <div className="shrink-0">
        {!retried ? (
          <div className="flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-500">
            <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-yellow-500" />
            {t("api_error.retrying", { count: countdown })}
          </div>
        ) : (
          <button
            onClick={retryFn}
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium rounded-lg transition-colors"
          >
            {t("api_error.retry_now")}
          </button>
        )}
      </div>
    </div>
  );
}
