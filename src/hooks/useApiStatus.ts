// src/hooks/useApiStatus.ts
import { useState, useCallback } from "react";

export function useApiStatus<T>(fn: () => Promise<T>) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const run = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const result: T = await fn();
      setData(result);
    } catch (err) {
      console.error("Erro na API:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fn]);

  return {
    loading,
    error,
    data,
    retry: run,
  };
}
