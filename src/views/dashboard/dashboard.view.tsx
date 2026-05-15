import { useWorkoutStore } from "../../hooks";
import { Page, List, Text, Footer, Calendar } from "../../components/ui";
import { DashboardItem } from "./components/dashboard-item";
import { useMemo } from "react";
import { NavBar } from "../../components/shared";
import { DashboardHeader } from "./components/dashboard-header";

export function DashboardView() {
  const { workoutMap } = useWorkoutStore();

  const workouts = useMemo(() => {
    return Object.values(workoutMap).sort((a, b) => {
      return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
    });
  }, [workoutMap]);

  return (
    <Page>
      <DashboardHeader />

      <List hasFade>
        <Text>Latest</Text>
        <DashboardItem workout={workouts[0]} />

        <Text>History</Text>
        <Calendar workouts={workouts} />

        {/* {workouts.length ? (
          workouts
            .slice(1)
            .map((workout) => <DashboardItem workout={workout} />)
        ) : (
          <Text>No sessions yet, go do one</Text>
        )} */}
      </List>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
