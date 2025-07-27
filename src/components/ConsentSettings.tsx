import { useCryptoStore } from "../store/cryptoStore";

export function ConsentSettings() {
  const { consentGiven, setConsentGiven } = useCryptoStore();

  const handleResetConsent = () => {
    setConsentGiven(false); // registra que ele recusou novamente
  };

  if (!consentGiven) return null;

  return (
    <div className="bg-white border border-gray-300 rounded p-4 max-w-md mx-auto mt-8 shadow">
      <h2 className="text-lg font-semibold mb-2">
        Preferências de Consentimento
      </h2>
      <p className="text-sm text-gray-600">
        Você {consentGiven.accepted ? "aceitou" : "recusou"} os termos em{" "}
        <strong>{new Date(consentGiven.at).toLocaleString()}</strong> (versão{" "}
        <strong>{consentGiven.version}</strong>).
      </p>

      <button
        onClick={handleResetConsent}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Revogar consentimento
      </button>
    </div>
  );
}
