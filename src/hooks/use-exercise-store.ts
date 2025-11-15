import { useState } from "react";
import { EXERCISE_STORE_KEY } from "../constants";
import type { IExercise, IExerciseMap } from "../models/gym";

const serialise = (data: IExerciseMap) => {
  localStorage.setItem(EXERCISE_STORE_KEY, JSON.stringify(data));
};

const deserialise = (): IExerciseMap => {
  return JSON.parse(
    localStorage.getItem(EXERCISE_STORE_KEY) ?? "{}",
  ) as IExerciseMap;
};

export function useExerciseStore() {
  const [exerciseMap, setExerciseMap] = useState(deserialise());

  function createExercise(exercise: IExercise) {
    const data = { ...exerciseMap, [exercise.id]: exercise };
    setExerciseMap(data);
    serialise(data);
  }

  return { exerciseMap, createExercise };
}
