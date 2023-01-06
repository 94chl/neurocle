import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = JSON.parse(localStorage.getItem(key));
    return !value ? initialValue : value;
  });

  const setValue = (value) => {
    const valueToStore =
      typeof value === "function" ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
