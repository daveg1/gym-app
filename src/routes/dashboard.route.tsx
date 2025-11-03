import { NavLink } from "react-router";
import { useStorage } from "../hooks";
import { formatDate } from "../utils";
import { Page, Header, List, Text, NavButton, Footer } from "../components/ui";
import { WorkoutItem } from "../components/shared";

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
              <WorkoutItem key={workout.id} workout={workout} />
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
