// src/utils/localStorage.ts

export const saveToLocal = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
};

export const loadFromLocal = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (e) {
    console.warn("Could not load from localStorage:", e);
    return null;
  }
};
