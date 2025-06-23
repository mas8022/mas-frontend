"use client"
import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  const handleSetState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    let value: T;

    try {
      value = storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (e) {
      value = initialValue;
    }

    if (value === null || value === undefined) {
      localStorage.setItem(key, JSON.stringify(initialValue));
      value = initialValue;
    }

    setState(value);
    setIsPending(false);
  }, [key, initialValue]);

  return [state, handleSetState, isPending] as const;
};
