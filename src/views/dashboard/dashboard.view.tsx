import { useCreateSessionStore, useWorkoutStore } from "../../hooks";
import { Page, List, Text, Footer, Calendar } from "../../components/ui";
import { DashboardItem } from "./components/dashboard-item";
import { useMemo, useState } from "react";
import { NavBar } from "../../components/shared";
import { DashboardHeader } from "./components/dashboard-header";
import { HOME_STORE_KEY } from "../../constants";

interface HomeSession {
  date: number;
}

export function DashboardView() {
  const { workoutMap } = useWorkoutStore();
  const { getSession, setSession } =
    useCreateSessionStore<HomeSession>(HOME_STORE_KEY);
  const [dateTs, setDateTs] = useState(getSession("date") ?? Date.now());

  const workouts = useMemo(() => {
    return Object.values(workoutMap).sort((a, b) => {
      return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
    });
  }, [workoutMap]);

  return (
    <Page>
      <DashboardHeader />

      <List hasFade>
        <Text bold size="m">
          Latest
        </Text>

        <DashboardItem workout={workouts[0]} />

        <Calendar
          date={dateTs}
          workouts={workouts}
          onChange={(d) => {
            setSession("date", +d);
            setDateTs(+d);
          }}
        />
      </List>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
