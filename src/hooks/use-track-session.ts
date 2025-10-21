import { useState } from "react";
import { MockSets, type ISet } from "../models/gym";

export function useTrackSession() {
  const [isRunning, setIsRunning] = useState(true);
  const [sets, setSets] = useState<ISet[]>(MockSets);

  function startSession() {
    setIsRunning(true);
  }

  function endSession() {
    setIsRunning(false);
  }

  function addSet(newSet: ISet) {
    setSets((sets) => [...sets, newSet]);
  }

  return { isRunning, startSession, endSession, sets, addSet };
}
