import { useState } from "react";

export function useTrackSession() {
  const [isRunning, setIsRunning] = useState(true);

  function startSession() {
    setIsRunning(true);
  }

  function endSession() {
    setIsRunning(false);
  }

  return { isRunning, startSession, endSession };
}
