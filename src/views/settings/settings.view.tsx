import { ExportIcon, ImportIcon } from "../../components/icons";
import { NavBar } from "../../components/shared";
import {
  Button,
  Footer,
  Header,
  List,
  Page,
  SelectBox,
  Text,
} from "../../components/ui";
import { SectionCard } from "../../components/ui/section-card";
import { usePlannerStore, useWorkoutStore } from "../../hooks";
import type { IWorkoutMap } from "../../models/gym";
import type { IPlan } from "../../models/planner";

interface DataFormat {
  workouts: IWorkoutMap;
  plans: IPlan[];
}

export function SettingsView() {
  const { workoutMap, importWorkouts } = useWorkoutStore();
  const { plans, importPlans } = usePlannerStore();

  const handleImport = () => {
    const code = prompt("Enter your export code:")?.trim();
    if (!code) return;

    try {
      const decoded = JSON.parse(atob(code)) as DataFormat;
      const isValid = confirm(`Does this look right?
        Workouts: ${Object.values(decoded.workouts).length}
        Planner items: ${decoded.plans.length}`);

      if (isValid) {
        importWorkouts(decoded.workouts);
        importPlans(decoded.plans);
      }
    } catch {
      console.log("failed...");
    }
  };

  const handleExport = () => {
    const out: DataFormat = { workouts: workoutMap, plans };
    const base64 = btoa(JSON.stringify(out));

    try {
      navigator.clipboard.writeText(base64).then((a) => console.log(a));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page>
      <Header text="Settings" />

      <List>
        <SectionCard title="Backups">
          <div className="flex flex-col gap-3">
            <Text>
              WARNING: This is experimental and may result in data loss.
            </Text>

            <Button
              className="flex items-center justify-center gap-2"
              onClick={() => handleImport()}
            >
              <ImportIcon />
              <span>Import data</span>
            </Button>

            <Button
              className="flex items-center justify-center gap-2"
              onClick={() => handleExport()}
            >
              <ExportIcon />
              <span>Export data</span>
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Preferences">
          <div className="pt-3">
            <SelectBox
              label="Units"
              data={[
                { label: "Metric (kg)", value: "metric" },
                { label: "Imperial (lbs)", value: "imperial" },
              ]}
            />
          </div>
        </SectionCard>
      </List>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
