import { Route, Routes } from "react-router";
import { DashboardRoute } from "./routes/dashboard.route";
import { SessionRoute } from "./routes";
import { DetailsRoute } from "./routes/details.route";

function App() {
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
  );
}

export default App;
