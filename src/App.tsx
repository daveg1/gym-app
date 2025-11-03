import { Route, Routes } from "react-router";
import { DashboardRoute, DetailsRoute, WorkoutRoute } from "./routes";

function App() {
  // TODO: add cancel button
  // TODO: add session view screen

  return (
    <main className="mx-auto flex h-screen max-w-2xl flex-col overflow-hidden">
      <Routes>
        <Route index element={<DashboardRoute />} />
        <Route path="workout" element={<WorkoutRoute />} />
        <Route path="details/:sessionId" element={<DetailsRoute />} />
      </Routes>
    </main>
  );
}

export default App;
