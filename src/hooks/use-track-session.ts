import { useState } from "react";
import { MockSets, type GymSet } from "../models/gym";

export function useTrackSession() {
  const [isRunning, setIsRunning] = useState(true);
  const [sets, setSets] = useState<GymSet[]>(MockSets);

  function startSession() {
    setIsRunning(true);
  }

  function endSession() {
    setIsRunning(false);
  }

  function addSet(newSet: GymSet) {
    setSets((sets) => [...sets, newSet]);
  }

  return { isRunning, startSession, endSession, sets, addSet };
}
