import { useCallback, useState } from "react";
import type { IExercise } from "./models/gym";
import { useStorage } from "./hooks/use-storage";
import { Route, Routes } from "react-router";
import { DashboardRoute } from "./routes/dashboard.route";
import { SessionRoute } from "./routes";
import { DetailsRoute } from "./routes/details.route";

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
    <main className="mx-auto flex h-screen max-w-2xl flex-col overflow-hidden">
      <Routes>
        <Route index element={<DashboardRoute />} />
        <Route path="session" element={<SessionRoute />} />
        <Route path="details/:sessionId" element={<DetailsRoute />} />
      </Routes>
    </main>

    // <div className="mx-auto flex h-screen max-w-2xl flex-col">
    //   {isRunning ? (
    //     <SessionScreen onEnd={handleEnd} />
    //   ) : (
    //     <StartScreen
    //       sessionMap={sessionMap}
    //       onStart={() => setIsRunning(true)}
    //     />
    //   )}
    // </div>
  );
}

export default App;
