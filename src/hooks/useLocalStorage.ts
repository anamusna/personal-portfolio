import { useState } from "react";
import { STORAGE_KEYS } from "../shared/constants/storage";
import { devError } from "../utils/logger";

export const useLocalStorage = <T>(
  key: keyof typeof STORAGE_KEYS,
  initialValue: T
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEYS[key]);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      devError(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(
        STORAGE_KEYS[key],
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      devError(error);
    }
  };

  return [storedValue, setValue] as const;
};
