import { useState } from "react";
import { MockExercises, type IExercise } from "../models/gym";

export function useTrackSession() {
  const [isRunning, setIsRunning] = useState(true);
  const [exercises, setExercise] = useState<IExercise[]>(MockExercises);

  function startSession() {
    setIsRunning(true);
  }

  function endSession() {
    setIsRunning(false);
  }

  function addSet(newVal: IExercise) {
    setExercise((vals) => [...vals, newVal]);
  }

  return { isRunning, startSession, endSession, exercises, addSet };
}
