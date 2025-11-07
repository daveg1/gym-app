import { useState } from "react";
import type { IExercise } from "../models/gym";

export function useCurrentSession() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const sessionId = crypto.randomUUID();

  const addExercise = (value: IExercise) => {
    setExercises((current) => [...current, value]);
  };

  const updateExercise = (value: IExercise) => {
    setExercises((current) => {
      const copy = [...current];

      const idx = copy.findIndex((ex) => ex.id === value.id);
      copy[idx].sets = value.sets;

      return copy;
    });
  };

  return { sessionId, exercises, addExercise, updateExercise };
}
