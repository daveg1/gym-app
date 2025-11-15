import { useLocation } from "react-router";
import { NavBar } from "../../components/shared";
import { Page, Header, Footer, NavButton } from "../../components/ui";
import { useWorkoutStore } from "../../hooks";
import { LineChart } from "@mui/x-charts";
import { SectionCard } from "../../components/ui/section-card";
import { BackIcon } from "../../components/icons";

export function StatsDetailsView() {
  const { workoutMap } = useWorkoutStore();
  const location = useLocation();
  const exerciseName = decodeURI(location.pathname.split("/stats/")[1]);

  // TODO: limit dataset to this month
  // TODO: add prev button for previous months
  const exercises = Object.values(workoutMap)
    .slice(-5)
    .flatMap((w) => w.exercises.filter((ex) => ex.name === exerciseName));
  const sets = exercises.map((ex) =>
    ex.sets.reduce(
      (a, { weight: b }) => (+b > a ? +b : a),
      Number.MIN_SAFE_INTEGER,
    ),
  );
  const min =
    sets.reduce((a, b) => (b < a ? b : a), Number.MAX_SAFE_INTEGER) - 20;
  const max =
    sets.reduce((a, b) => (b > a ? b : a), Number.MIN_SAFE_INTEGER) + 20;

  return (
    <Page>
      <Header
        text="Stats"
        caption={exerciseName}
        leftSide={
          <NavButton to="/stats">
            <BackIcon />
          </NavButton>
        }
      />

      <div className="flex h-full flex-col gap-4 px-6">
        <SectionCard
          title="Weight progression"
          caption="Highest weight per session"
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
          />
        </SectionCard>
      </div>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
