// src/components/ConsentBanner.tsx
import { useTranslation } from "react-i18next";
import { useCryptoStore } from "../store/cryptoStore";

export function ConsentBanner() {
  const { consentGiven, setConsentGiven } = useCryptoStore();
  const { t } = useTranslation();

  if (consentGiven !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            🍪 {t("consent.title")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {t("consent.description")}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setConsentGiven(false)}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {t("consent.decline")}
          </button>
          <button
            onClick={() => setConsentGiven(true)}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
          >
            {t("consent.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
