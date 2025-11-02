import { NavLink } from "react-router";
import { useStorage } from "../hooks/use-storage";
import { Header } from "../components/header";

export function DashboardRoute() {
  const { sessionMap } = useStorage();

  const sessions = Object.entries(sessionMap);

  return (
    <>
      <section className="flex h-full flex-col gap-4 overflow-y-auto py-6">
        <Header text="Past workouts" />

        <div className="flex h-full flex-col gap-2 overflow-y-auto px-6 py-4">
          {sessions.length ? (
            sessions.map(([id, _]) => (
              <NavLink
                key={id}
                className="rounded-lg bg-gray-100 p-3 text-lg"
                to={"/details/" + id}
              >
                {id}
              </NavLink>
            ))
          ) : (
            <p className="text-lg">No sessions yet, go do one</p>
          )}
        </div>

        <footer className="flex flex-col px-6">
          <NavLink
            to="/workout"
            className="rounded-lg bg-gray-200/50 p-4 text-center text-lg font-semibold text-cyan-600"
          >
            Start workout
          </NavLink>
        </footer>
      </section>
    </>
  );
}
