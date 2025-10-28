import { createContext, useContext, useState, type ReactNode } from "react";
import { type IExercise } from "../models/gym";
import { STORAGE_KEY } from "../constants";

interface ISessionContext {
  exercises: IExercise[];
  addExercise: (val: IExercise) => void;

  isRunning: boolean;
  startSession(): void;
  endSession(): void;
}

const SessionContext = createContext<ISessionContext>(null!);

// TODO: investigate indexDB

const serialise = (data: unknown) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const deserialise = (): IExercise[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as IExercise[];
};

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const [isRunning, setIsRunning] = useState(false);
  const [exercises, setExercise] = useState<IExercise[]>(deserialise());

  let sessionId: string | null = null;

  const createSession = () => {
    sessionId = crypto.randomUUID();
  };

  const addExercise = (newVal: IExercise) => {
    const newVals = [...exercises, newVal];
    serialise(newVals);
    setExercise(newVals);
  };

  const startSession = () => {
    setIsRunning(true);
  };

  const endSession = () => {
    createSession();
    setIsRunning(false);
  };

  const value: ISessionContext = {
    isRunning,
    exercises,
    addExercise,
    startSession,
    endSession,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
