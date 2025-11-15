import { ExportIcon, ImportIcon } from "../../components/icons";
import { NavBar } from "../../components/shared";
import { Button, Footer, Header, Page } from "../../components/ui";
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

      <div className="flex h-full flex-col justify-end gap-2 px-6">
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

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
