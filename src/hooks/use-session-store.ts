import { useState } from "react";

function read<T>(storageKey: string): T {
  return JSON.parse(localStorage.getItem(storageKey) ?? "{}") as T;
}

function write<T>(storageKey: string, data: T): void {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

/**
 * Used to persist user flow
 */
export function useCreateSessionStore<T>(storageKey: Readonly<string>) {
  const [store, setStore] = useState<T>(read(storageKey));

  function setSession(key: keyof T, value: T[keyof T]) {
    setStore((prev) => ({ ...prev, [key]: value }));
    write(storageKey, { ...store, [key]: value });
  }

  function getSession(key: keyof T): T[keyof T] | undefined {
    return store[key];
  }

  return { setSession, getSession };
}
