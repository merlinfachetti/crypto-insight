// src/components/ConsentSettings.tsx
import { useCryptoStore } from "../store/cryptoStore";

export function ConsentSettings() {
  const { consentGiven, setConsentGiven } = useCryptoStore();

  if (!consentGiven) return null;

  const formattedDate = new Date(consentGiven.at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mt-10 border border-gray-200 dark:border-gray-700 rounded-xl p-5 max-w-md bg-white dark:bg-gray-800 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
        Storage Preferences
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        You{" "}
        <span
          className={`font-medium ${
            consentGiven.accepted
              ? "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {consentGiven.accepted ? "accepted" : "declined"}
        </span>{" "}
        local storage on{" "}
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {formattedDate}
        </span>{" "}
        <span className="text-xs text-gray-400 dark:text-gray-500">
          ({consentGiven.version})
        </span>
      </p>

      <button
        onClick={() => setConsentGiven(false)}
        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        Revoke consent
      </button>
    </div>
  );
}
