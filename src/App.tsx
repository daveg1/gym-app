import { useCallback, useState } from "react";
import { ActiveSession, StartScreen } from "./screens";
import type { IExercise } from "./models/gym";
import { useStorage } from "./hooks/use-storage";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const { saveData } = useStorage();

  const handleEnd = useCallback((id: string, session: IExercise[]) => {
    if (confirm("Are you sure?")) {
      setIsRunning(false);
      saveData(id, session);
    }
  }, []);

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col">
      {isRunning ? (
        <ActiveSession onEnd={handleEnd} />
      ) : (
        <StartScreen onStart={() => setIsRunning(true)} />
      )}
    </div>
  );
}

export default App;
