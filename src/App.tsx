import { useCallback } from "react";
import { ActiveSession, StartScreen } from "./screens";
import { useSessionContext } from "./context";

function App() {
  const { isRunning, startSession, endSession } = useSessionContext();

  const handleEnd = useCallback(() => {
    if (confirm("Are you sure?")) {
      endSession();
    }
  }, []);

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col">
      {isRunning ? (
        <ActiveSession onEnd={handleEnd} />
      ) : (
        <StartScreen onStart={startSession} />
      )}
    </div>
  );
}

export default App;
