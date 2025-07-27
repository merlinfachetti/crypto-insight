import { useEffect, useState } from "react";

interface ApiFallbackProps {
  retryFn: () => void;
  retryDelay?: number;
}

export function ApiFallback({ retryFn, retryDelay = 10000 }: ApiFallbackProps) {
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRetrying(true);
      retryFn();
    }, retryDelay);
    return () => clearTimeout(timeout);
  }, [retryFn, retryDelay]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 text-white">
      <p className="text-lg font-medium mb-2">
        😓 Desculpe, algo deu errado com a API.
      </p>
      <p className="text-sm mb-4 text-gray-400">
        Estamos tentando recuperar os dados automaticamente...
      </p>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2" />
      {retrying && (
        <button
          onClick={retryFn}
          className="mt-4 px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-200"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
