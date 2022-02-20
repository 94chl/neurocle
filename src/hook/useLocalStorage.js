import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialValue
  );

  const setValue = (value) => {
    const valueToStore =
      typeof value === "function" ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
