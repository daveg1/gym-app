import { useStorage } from "../../hooks";
import {
  Page,
  Header,
  List,
  Text,
  NavButton,
  Footer,
} from "../../components/ui";
import { useCallback } from "react";
import { WorkoutItem } from "./components/workout-item";

export function DashboardView() {
  const { workoutMap, deleteById } = useStorage();

  const workouts = Object.values(workoutMap);

  const handleDelete = useCallback((id: string) => {
    deleteById(id);
  }, []);

  return (
    <>
      <Page>
        <Header text="Your workouts" />

        <List>
          {workouts.length ? (
            workouts.map((workout) => (
              <WorkoutItem
                key={workout.id}
                workout={workout}
                onDelete={handleDelete}
              />
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
