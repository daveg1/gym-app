import { createContext, useContext, useState, type ReactNode } from "react";
import { type IExercise } from "../models/gym";
import { STORAGE_KEY } from "../constants";

const SessionContext = createContext<{
  exercises: IExercise[];
  addExercise: (val: IExercise) => void;
}>(null!);

// TODO: investigate indexDB

const serialise = (data: unknown) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const deserialise = (): IExercise[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as IExercise[];
};

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercise] = useState<IExercise[]>(deserialise());

  const addExercise = (newVal: IExercise) => {
    const newVals = [...exercises, newVal];
    serialise(newVals);
    setExercise(newVals);
  };

  const value = {
    exercises,
    addExercise,
  } as const;

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
