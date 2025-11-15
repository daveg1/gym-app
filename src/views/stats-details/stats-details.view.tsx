import { useLocation } from "react-router";
import { NavBar } from "../../components/shared";
import { Page, Header, Footer, NavButton } from "../../components/ui";
import { useWorkoutStore } from "../../hooks";
import { LineChart } from "@mui/x-charts";
import { SectionCard } from "../../components/ui/section-card";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
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
