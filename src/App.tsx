import { useCallback, useMemo, useState } from "react";
import type { IExercise } from "./models/gym";
import { useStorage } from "./hooks/use-storage";
import { NavLink, Route, Routes } from "react-router";
import { DashboardRoute } from "./routes/dashboard.route";
import { SessionRoute } from "./routes";
import { DetailsRoute } from "./routes/details.route";
import clsx from "clsx";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const { saveData } = useStorage();

  const handleEnd = useCallback((id: string, session: IExercise[]) => {
    if (confirm("Are you sure?")) {
      setIsRunning(false);
      saveData(id, session);
    }
  }, []);

  // TODO: add cancel button
  // TODO: add session view screen

  const routeLinks: {
    path: string;
    label: string;
    icon?: React.ReactElement;
  }[] = useMemo(
    () => [
      {
        path: "/",
        label: "Dashboard",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        path: "/session",
        label: "Session",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
    [],
  );

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col">
      <main className="h-full overflow-hidden">
        <Routes>
          <Route index element={<DashboardRoute />} />
          <Route path="session" element={<SessionRoute />} />
          <Route path="details/:sessionId" element={<DetailsRoute />} />
        </Routes>
      </main>

      <nav className="grid grid-cols-2 gap-2 bg-gray-100">
        {routeLinks.map((navLink) => (
          <NavLink
            className={(link) =>
              clsx(
                "flex h-16 items-center justify-center gap-2 font-semibold transition-colors",
                link.isActive && "bg-blue-400",
              )
            }
            to={navLink.path}
            end
          >
            {navLink.icon}
            {navLink.label}
          </NavLink>
        ))}
      </nav>
    </div>

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
