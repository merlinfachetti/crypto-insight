// src/components/ErrorDisplay.tsx
import { AlertTriangle } from "lucide-react";

export const ErrorDisplay = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <h3 className="ml-2 text-sm font-medium text-red-800">{message}</h3>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center rounded-md bg-red-100 px-2.5 py-1.5 text-sm font-medium text-red-800 hover:bg-red-200"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
};
