import { useEffect, useState } from "react";

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("consentGiven");
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (value: boolean) => {
    localStorage.setItem("consentGiven", value.toString());
    setShowBanner(false);
    window.location.reload();
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full bg-black text-white text-sm p-4 flex justify-between items-center z-50">
      <span>
        Este site utiliza dados locais para melhorar sua experiência. Você
        aceita os termos?
      </span>
      <div className="space-x-2">
        <button
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          onClick={() => handleConsent(true)}
        >
          Aceitar
        </button>
        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={() => handleConsent(false)}
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
