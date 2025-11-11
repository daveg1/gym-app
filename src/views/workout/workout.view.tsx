import { Page } from "../../components/ui";
import { WorkoutFooter } from "./components/workout-footer";
import { WorkoutHeader } from "./components/workout-header";
import { WorkoutList } from "./components/workout-list";
import { WorkoutContextProvider } from "./workout.context";

export function WorkoutView() {
  // todo: store session in local storage until we finish or cancel
  // todo: then reload it on any page refreshes.
  // const tempState = {};

  return (
    <WorkoutContextProvider>
      <Page>
        <WorkoutHeader />

        <WorkoutList />

        <WorkoutFooter />
      </Page>
    </WorkoutContextProvider>
  );
}
