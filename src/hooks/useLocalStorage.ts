"use client";
import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const handleSetState = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (err) {
      console.error("Failed to set localStorage:", err);
    }
  };

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      let value;

      if (storedValue !== null) {
        value = JSON.parse(storedValue);
      } else {
        value = initialValue;
        localStorage.setItem(key, JSON.stringify(initialValue));
      }

      setState(value);
    } catch (err) {
      console.error("Failed to load from localStorage:", err);
      setState(initialValue);
    }

    setIsPending(false);
  }, [key]);

  return [state || [], handleSetState, isPending];
};
