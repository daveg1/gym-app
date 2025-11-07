import { useState } from "react";
import type { IExercise } from "../models/gym";

export function useCurrentSession() {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const sessionId = crypto.randomUUID();

  const addExercise = (value: IExercise) => {
    setExercises((current) => [...current, value]);
  };

  const updateExercise = (changes: Partial<IExercise>) => {
    setExercises((current) => {
      const copy = [...current];

      const idx = copy.findIndex((ex) => ex.id === changes.id);
      Object.assign(copy[idx], changes);

      return copy;
    });
  };

  const deleteExercise = (id: IExercise["id"]) => {
    setExercises((current) => {
      const copy = [...current];

      const idx = copy.findIndex((ex) => ex.id === id);
      copy.splice(idx, 1);

      return copy;
    });
  };

  return { sessionId, exercises, addExercise, updateExercise, deleteExercise };
}
