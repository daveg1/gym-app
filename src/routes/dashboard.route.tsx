import { NavLink } from "react-router";
import { useStorage } from "../hooks/use-storage";

export function DashboardRoute() {
  const { sessionMap } = useStorage();

  const sessions = Object.keys(sessionMap);

  return (
    <>
      <section className="flex h-full flex-col gap-4 overflow-y-auto p-6">
        <h2 className="text-3xl font-semibold">Past workouts</h2>

        <div className="flex h-full flex-col gap-2 overflow-y-auto">
          {sessions.length ? (
            sessions.map((sesh) => (
              <>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
                <NavLink
                  className="rounded-lg bg-gray-100 p-3 text-lg"
                  to={"/details/" + sesh}
                >
                  Session 1
                </NavLink>
              </>
            ))
          ) : (
            <p>No sessions yet, go do one</p>
          )}
        </div>
      </section>
    </>
  );
}
