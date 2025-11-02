import { NavLink } from "react-router";
import { useStorage } from "../hooks/use-storage";
import { Header } from "../components/header";
import { formatDate } from "../utils/format-date";

export function DashboardRoute() {
  const { workoutMap } = useStorage();

  const workouts = Object.values(workoutMap);

  return (
    <>
      <section className="flex h-full flex-col gap-4 overflow-y-auto py-6">
        <Header text="Past workouts" />

        <div className="flex h-full flex-col gap-2 overflow-y-auto px-6 py-4">
          {workouts.length ? (
            workouts.map((workout) => (
              <NavLink
                key={workout.id}
                className="rounded-lg bg-gray-100 p-4 text-lg"
                to={"/details/" + workout.id}
              >
                <h2 className="text-xl font-semibold">
                  {formatDate(workout.timestamp)}
                </h2>
                <p>
                  {workout.exercises.length} exercise
                  {workout.exercises.length === 1 ? "" : "s"}
                </p>
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
