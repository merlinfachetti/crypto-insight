// src/components/ConsentSettings.tsx
import { useTranslation } from "react-i18next";
import { useCryptoStore } from "../store/cryptoStore";

export function ConsentSettings() {
  const { consentGiven, setConsentGiven } = useCryptoStore();
  const { t, i18n } = useTranslation();

  if (!consentGiven) return null;

  const formattedDate = new Date(consentGiven.at).toLocaleString(
    i18n.language === "pt" ? "pt-BR" : "en-US",
    { dateStyle: "medium", timeStyle: "short" }
  );

  return (
    <div className="mt-10 border border-gray-200 dark:border-gray-700 rounded-xl p-5 max-w-md bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        {t("consent.settings_title")}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t("consent.status_text", {
          status: (
            <span
              key="status"
              className={`font-medium ${
                consentGiven.accepted
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {t(consentGiven.accepted ? "consent.status_accepted" : "consent.status_declined")}
            </span>
          ) as unknown as string,
          date: formattedDate,
        })}
        {" "}
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({consentGiven.version})
        </span>
      </p>
      <button
        onClick={() => setConsentGiven(false)}
        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        {t("consent.revoke")}
      </button>
    </div>
  );
}
