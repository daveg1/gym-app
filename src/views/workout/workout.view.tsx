import { Page } from "../../components/ui";
import { WorkoutExerciseDialog } from "./components/workout-exercise-dialog";
import { WorkoutFooter } from "./components/workout-footer";
import { WorkoutHeader } from "./components/workout-header";
import { WorkoutList } from "./components/workout-list";
import { WorkoutContextProvider } from "./workout.context";

export function WorkoutView() {
  return (
    <WorkoutContextProvider>
      <Page>
        <WorkoutHeader />

        <WorkoutExerciseDialog />

        <WorkoutList />

        <WorkoutFooter />
      </Page>
    </WorkoutContextProvider>
  );
}
