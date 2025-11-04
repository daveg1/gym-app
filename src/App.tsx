import { Route, Routes } from "react-router";
import { DashboardRoute, DetailsRoute, WorkoutRoute } from "./routes";

function App() {
  return (
    <main className="mx-auto flex h-dvh max-w-2xl flex-col overflow-hidden">
      <Routes>
        <Route index element={<DashboardRoute />} />
        <Route path="workout" element={<WorkoutRoute />} />
        <Route path="details/:sessionId" element={<DetailsRoute />} />
      </Routes>
    </main>
  );
}

export default App;
