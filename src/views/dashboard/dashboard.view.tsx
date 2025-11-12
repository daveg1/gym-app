import { useStorage } from "../../hooks";
import {
  Page,
  Header,
  List,
  Text,
  NavButton,
  Footer,
} from "../../components/ui";
import { WorkoutItem } from "./components/workout-item";
import { WORKOUT_SESSION_KEY } from "../../constants";

export function DashboardView() {
  const { workoutMap } = useStorage();

  const workouts = Object.values(workoutMap);
  const hasSession = !!localStorage.getItem(WORKOUT_SESSION_KEY);

  return (
    <>
      <Page>
        <Header text="Your workouts" />

        <List hasFade>
          {workouts.length ? (
            workouts.map((workout) => (
              <WorkoutItem key={workout.id} workout={workout} />
            ))
          ) : (
            <Text>No sessions yet, go do one</Text>
          )}
        </List>

        <Footer>
          <NavButton
            to="/workout"
            text={hasSession ? "Resume workout" : "Start workout"}
          />
        </Footer>
      </Page>
    </>
  );
}
