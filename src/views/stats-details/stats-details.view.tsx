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

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // TODO: limit dataset to this month
  // TODO: add prev button for previous months
  const exercises = Object.values(workoutMap)
    // .slice(-5)
    .flatMap((w) => w.exercises.filter((ex) => ex.id === exerciseId));
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
    if (!index) return;
    setSelectedIndex(index);
  }

  return (
    <Page>
      <Header
        text="Stats"
        caption={exerciseObj.name}
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

        {selectedIndex && (
          <SectionCard title={"Sets for " + selectedIndex}>
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
