import { useState } from "react";
import type { IWorkoutMap, IWorkout } from "../models";
import { WORKOUT_STORE_KEY } from "../constants";

const serialise = (data: IWorkoutMap) => {
  localStorage.setItem(WORKOUT_STORE_KEY, JSON.stringify(data));
};

const deserialise = (): IWorkoutMap => {
  return JSON.parse(
    localStorage.getItem(WORKOUT_STORE_KEY) ?? "{}",
  ) as IWorkoutMap;
};

export function useWorkoutStore() {
  const [workoutMap, setWorkoutMap] = useState(deserialise());

  function addOrSaveWorkout(workout: IWorkout) {
    const data = { ...workoutMap, [workout.id]: workout };
    setWorkoutMap(data);
    serialise(data);
  }

  function getById(workoutId: string) {
    return workoutMap[workoutId];
  }

  function deleteById(workoutId: string) {
    setWorkoutMap((current) => {
      const copy = { ...current };
      delete copy[workoutId];
      serialise(copy);
      return copy;
    });
  }

  function importWorkouts(workoutMap: IWorkoutMap) {
    setWorkoutMap(workoutMap);
    serialise(workoutMap);
  }

  return {
    workoutMap,
    addOrSaveWorkout,
    getById,
    deleteById,
    importWorkouts,
  };
}
