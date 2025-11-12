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
import { Fragment, useMemo } from "react";
import { TextSeparator } from "../../components/shared";

export function DashboardView() {
  const { workoutMap } = useStorage();

  const workouts = useMemo(() => {
    return Object.values(workoutMap).sort((a, b) => {
      return a.timestamp > b.timestamp
        ? -1
        : a.timestamp < b.timestamp
          ? 11
          : 0;
    });
  }, [workoutMap]);
  const hasSession = !!localStorage.getItem(WORKOUT_SESSION_KEY);

  return (
    <>
      <Page>
        <Header text="Test" />

        <List hasFade>
          {workouts.length ? (
            workouts.map((workout, index) =>
              index === 0 ? (
                <Fragment key={workout.id}>
                  <TextSeparator text="Latest" />
                  <WorkoutItem workout={workout} />
                  <TextSeparator text="Previous" />
                </Fragment>
              ) : (
                <WorkoutItem key={workout.id} workout={workout} />
              ),
            )
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
