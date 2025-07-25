// src/components/CookieConsent.tsx
import React, { useState, useEffect } from "react";
import { useCryptoStore } from "../store/cryptoStore";

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { consentGiven, setConsentGiven } = useCryptoStore();

  useEffect(() => {
    if (!consentGiven) setVisible(true);
  }, [consentGiven]);

  const accept = () => {
    setConsentGiven(true);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 bg-white shadow-lg border p-4 rounded z-50">
      <p className="text-sm text-gray-700">
        This application uses local storage to save your favorite
        cryptocurrencies. No personal data is collected or shared. By
        continuing, you agree to the use of local storage for this purpose.
      </p>
      <div className="mt-3 text-right">
        <button
          onClick={accept}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
        >
          I Understand and Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
