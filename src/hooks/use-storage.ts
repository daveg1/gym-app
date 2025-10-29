import { useState } from "react";
import type { IExercise, ISessionMap } from "../models/gym";
import { STORAGE_KEY } from "../constants";

const serialise = (data: ISessionMap) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const deserialise = (): ISessionMap => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as ISessionMap;
};

export function useStorage() {
  const [sessionMap, setSessionMap] = useState(deserialise());

  function saveData(sessionId: string, session: IExercise[]) {
    const data = { ...sessionMap, [sessionId]: session };
    setSessionMap(data);
    serialise(data);
  }

  return { sessionMap, saveData };
}
