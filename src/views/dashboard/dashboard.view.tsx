import { useStorage } from "../../hooks";
import { Page, List, Text, Footer } from "../../components/ui";
import { DashboardItem } from "./components/dashboard-item";
import { Fragment, useMemo } from "react";
import { NavBar } from "../../components/shared";
import { DashboardHeader } from "./components/dashboard-header";

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

  return (
    <Page>
      <DashboardHeader />

      <List hasFade>
        {workouts.length ? (
          workouts.map((workout, index) =>
            index === 0 ? (
              <Fragment key={workout.id}>
                <Text>Latest</Text>
                <DashboardItem workout={workout} />
                <Text>Previous</Text>
              </Fragment>
            ) : (
              <DashboardItem key={workout.id} workout={workout} />
            ),
          )
        ) : (
          <Text>No sessions yet, go do one</Text>
        )}
      </List>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
