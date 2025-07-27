import { useCryptoStore } from "../store/cryptoStore";

export function ConsentBanner() {
  const { consentGiven, setConsentGiven } = useCryptoStore();

  if (consentGiven !== null) return null;

  const handleConsent = (value: boolean) => {
    setConsentGiven(value);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white text-sm p-4 flex justify-between items-center z-50">
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
