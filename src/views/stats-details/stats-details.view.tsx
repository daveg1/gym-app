import { useLocation } from "react-router";
import { NavBar } from "../../components/shared";
import { Page, Header, Footer, NavButton } from "../../components/ui";
import { useExerciseStore, useWorkoutStore } from "../../hooks";
import { LineChart, type ChartsAxisData } from "@mui/x-charts";
import { SectionCard } from "../../components/ui/section-card";
import { BackIcon } from "../../components/icons";
import { useState } from "react";

export function StatsDetailsView() {
  const { workoutMap } = useWorkoutStore();
  const { exerciseMap } = useExerciseStore();
  const location = useLocation();
  const exerciseId = decodeURI(location.pathname.split("/stats/")[1]);
  const exerciseObj = exerciseMap[exerciseId];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // TODO: option limit dataset to a given month
  const exercises = Object.values(workoutMap)
    .flatMap((w) => w.exercises.filter((ex) => ex.id === exerciseId))
    .slice(-5);
  const sets = exercises.map((ex) =>
    ex.sets.reduce(
      (a, { weight: b }) => (+b > a ? +b : a),
      Number.MIN_SAFE_INTEGER,
    ),
  );

  const MARGIN_PERCENT = 0.3;
  const min =
    sets.reduce((a, b) => (b < a ? b : a), Number.MAX_SAFE_INTEGER) *
    (1 - MARGIN_PERCENT);
  const max =
    sets.reduce((a, b) => (b > a ? b : a), Number.MIN_SAFE_INTEGER) *
    (1 + MARGIN_PERCENT);

  function handleGraphClick(data: ChartsAxisData | null) {
    const index = data?.dataIndex;
    setSelectedIndex(index === null || index === undefined ? -1 : index);
  }

  return (
    <Page>
      <Header
        text={exerciseObj.name}
        leftSide={
          <NavButton to="/stats">
            <BackIcon />
          </NavButton>
        }
      />

      <div className="flex h-full flex-col gap-4 px-6">
        <SectionCard
          title="Weight progression"
          caption="Heaviest weight across sessions"
        >
          <LineChart
            height={280}
            margin={{ left: 0, top: 10 }}
            grid={{ vertical: true, horizontal: true }}
            title="Best set per workout"
            xAxis={[
              {
                data: sets.map((_, i) => i + 1),
                tickMinStep: 1,
                valueFormatter: String,
              },
            ]}
            yAxis={[{ min, max }]}
            series={[
              {
                data: sets,
                label: (loc) => (loc === "tooltip" ? "KG" : "Weight (kg)"),
              },
            ]}
            onAxisClick={(_, data) => handleGraphClick(data)}
          />
        </SectionCard>

        {selectedIndex > -1 && !!exercises.length && (
          <SectionCard title={"Sets for " + (selectedIndex + 1)}>
            {exercises[selectedIndex].sets.map((set, index) => (
              <div key={index}>
                <span>{set.reps} reps</span>
                <span> x </span>
                <span>{set.weight} kg</span>
              </div>
            ))}
          </SectionCard>
        )}
      </div>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
