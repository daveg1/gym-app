import { NavLink, useLocation } from "react-router";
import { useStorage } from "../hooks/use-storage";
import { Header } from "../components/header";
import { Exercise } from "../components/exercise";
import { List } from "../components/list";
import { formatDate } from "../utils/format-date";
import { Text } from "../components/text";

export function DetailsRoute() {
  const { getSessionById } = useStorage();
  const location = useLocation();
  const workoutId = location.pathname.split("/details/")[1];
  const workout = getSessionById(workoutId);

  // ! FIXME: redirect not working
  // useEffect(() => {
  //   if (!workout) navigate("/");
  // }, [workout]);

  return (
    <section className="flex h-full flex-col gap-4 py-6">
      <Header text="Workout" caption={formatDate(workout.timestamp)} />

      <List>
        {workout.exercises.length ? (
          workout.exercises.map((ex) => (
            <Exercise key={ex.name} data={ex} readonly />
          ))
        ) : (
          <Text>This workout is empty</Text>
        )}
      </List>

      <footer className="flex flex-col px-6">
        <NavLink
          to="/"
          className="rounded-lg bg-gray-200/50 p-4 text-center text-lg font-semibold text-cyan-600"
        >
          Close
        </NavLink>
      </footer>
    </section>
  );
}
