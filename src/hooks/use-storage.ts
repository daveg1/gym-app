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

  function saveData(workoutId: string, workout: IWorkout) {
    const data = { ...workoutMap, [workoutId]: workout };
    setWorkoutMap(data);
    serialise(data);
  }

  function getSessionById(sessionId: string) {
    return workoutMap[sessionId];
  }

  return { workoutMap, saveData, getSessionById };
}
