import { useCallback, useState } from "react";
import { SessionScreen, StartScreen } from "./screens";
import type { IExercise } from "./models/gym";
import { useStorage } from "./hooks/use-storage";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const { sessionMap, saveData } = useStorage();

  const handleEnd = useCallback((id: string, session: IExercise[]) => {
    if (confirm("Are you sure?")) {
      setIsRunning(false);
      saveData(id, session);
    }
  }, []);

  // TODO: add cancel button
  // TODO: add session view screen

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col">
      {isRunning ? (
        <SessionScreen onEnd={handleEnd} />
      ) : (
        <StartScreen
          sessionMap={sessionMap}
          onStart={() => setIsRunning(true)}
        />
      )}
    </div>
  );
}

export default App;
