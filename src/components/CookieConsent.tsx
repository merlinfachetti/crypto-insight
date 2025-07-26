// src/components/CookieConsent.tsx
import React, { useEffect, useState } from "react";
import { useCryptoStore } from "../store/cryptoStore";
import { LucideCookie } from "lucide-react"; // opcional

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { consentGiven, setConsentGiven } = useCryptoStore();

  useEffect(() => {
    if (!consentGiven) {
      setVisible(true);
    }
  }, [consentGiven]);

  const accept = () => {
    setConsentGiven(true);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[1000] flex justify-center px-4 pointer-events-none">
      <div
        className="pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg shadow-lg max-w-3xl w-full mx-auto animate-fade-up"
        role="dialog"
        aria-live="polite"
      >
        <div className="flex gap-3 items-start sm:items-center">
          <LucideCookie className="w-5 h-5 mt-1 sm:mt-0" />
          <div>
            <p className="font-semibold text-sm">We value your privacy</p>
            <p className="text-xs text-white/90 leading-snug mt-1">
              This site uses local storage to save preferences and favorites. No
              personal data is collected or shared.
            </p>
          </div>
        </div>
        <div className="text-right w-full sm:w-auto">
          <button
            onClick={accept}
            className="bg-white text-blue-700 hover:bg-blue-100 transition-all px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
