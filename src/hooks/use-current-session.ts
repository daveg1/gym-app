import { useState } from "react";
import type { IExercise } from "../models/gym";

export function useCurrentSession() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const sessionId = crypto.randomUUID();

  const addExercise = (newVal: IExercise) => {
    setExercises((vals) => [...vals, newVal]);
  };

  return { sessionId, exercises, addExercise };
}
