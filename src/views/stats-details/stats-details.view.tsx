import { useLocation } from "react-router";
import { NavBar } from "../../components/shared";
import { Page, Header, Footer, Text } from "../../components/ui";
import { useWorkoutStore } from "../../hooks";
import { LineChart } from "@mui/x-charts";

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
      <Header text={`Stats for`} />

      <div className="flex h-full flex-col gap-4 px-6">
        <section className="rounded-xl bg-gray-100 p-4">
          <header>
            <h2 className="text-lg font-semibold">Weight progression</h2>
            <Text size="s">Highest weight per session</Text>
          </header>

          <main>
            <LineChart
              height={300}
              grid={{ vertical: true, horizontal: true }}
              title="Best set per workout"
              yAxis={[{ min, max }]}
              series={[{ data: sets }]}
            />
          </main>
        </section>
      </div>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
