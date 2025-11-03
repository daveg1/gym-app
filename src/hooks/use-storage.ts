import { useState } from "react";
import type { IWorkoutMap, IWorkout } from "../models/gym";
import { STORAGE_KEY } from "../constants";

const serialise = (data: IWorkoutMap) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const deserialise = (): IWorkoutMap => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as IWorkoutMap;
};

export function useStorage() {
  const [workoutMap, setWorkoutMap] = useState(deserialise());

  // TODO: rename to saveWorkout
  // TODO: remove workoutId param as it exists in workout object
  function saveData(workoutId: string, workout: IWorkout) {
    const data = { ...workoutMap, [workoutId]: workout };
    setWorkoutMap(data);
    serialise(data);
  }

  function getById(workoutId: string) {
    return workoutMap[workoutId];
  }

  async function deleteById(workoutId: string) {
    setWorkoutMap((current) => {
      const copy = { ...current };
      delete copy[workoutId];
      serialise(copy);
      return copy;
    });
  }

  return { workoutMap, saveData, getById, deleteById };
}
