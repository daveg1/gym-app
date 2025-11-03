import { NavLink } from "react-router";
import { useStorage } from "../hooks/use-storage";
import { Header } from "../components/header";
import { formatDate } from "../utils/format-date";
import { List } from "../components/list";
import { Text } from "../components/text";
import { NavButton } from "../components/nav-button";
import { Footer } from "../components/footer";
import { Page } from "../components/page";

export function DashboardRoute() {
  const { workoutMap } = useStorage();

  const workouts = Object.values(workoutMap);

  return (
    <>
      <Page>
        <Header text="Your workouts" />

        <List>
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
            <Text>No sessions yet, go do one</Text>
          )}
        </List>

        <Footer>
          <NavButton to="/workout" text="Start workout" />
        </Footer>
      </Page>
    </>
  );
}
