import { createContext, useContext, useState, type ReactNode } from "react";
import { MockExercises, type IExercise } from "../models/gym";

const SessionContext = createContext<{
  exercises: IExercise[];
  addExercise: (val: IExercise) => void;
}>(null!);

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const [exercises, setExercise] = useState<IExercise[]>(MockExercises);
  const addExercise = (newVal: IExercise) => {
    setExercise((vals) => [...vals, newVal]);
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
