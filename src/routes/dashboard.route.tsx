import { NavLink } from "react-router";
import { useStorage } from "../hooks/use-storage";

export function DashboardRoute() {
  const { sessionMap } = useStorage();

  const sessions = Object.keys(sessionMap);

  return (
    <>
      <section className="flex h-full flex-col gap-4 overflow-y-auto">
        <h2 className="px-6 pt-6 text-3xl font-semibold">Past workouts</h2>

        <div className="flex h-full flex-col gap-2 overflow-y-auto px-6">
          {sessions.length ? (
            sessions.map((sesh) => (
              <NavLink
                className="rounded-lg bg-gray-100 p-3 text-lg"
                to={"/details/" + sesh}
              >
                Session 1
              </NavLink>
            ))
          ) : (
            <p>No sessions yet, go do one</p>
          )}
        </div>

        <NavLink
          to="/session"
          className="mx-6 mb-6 flex justify-center rounded-lg bg-gray-200/50 p-4 text-lg font-semibold text-cyan-600"
        >
          Start workout
        </NavLink>
      </section>
    </>
  );
}
