import type { IExerciseMap, IPlan, IWorkoutMap } from "../models";
import { downloadFile, readFile } from "../utils";
import { useExerciseStore } from "./use-exercise-store";
import { usePlannerStore } from "./use-planner-store";
import { useWorkoutStore } from "./use-workout-store";

interface DataFormat {
  workouts: IWorkoutMap;
  plans: IPlan[];
  exercises: IExerciseMap;
}

function getDate() {
  const d = new Date();
  const day = `${d.getDate()}`.padStart(2, "0");
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  return `${day}-${month}-${d.getFullYear()}`;
}

/**
 * Used to handle storing and exporting local browser data
 */
export function useStorage() {
  const { workoutMap, importWorkouts } = useWorkoutStore();
  const { plans, importPlans } = usePlannerStore();
  const { exerciseMap, importExercises } = useExerciseStore();

  async function doExport() {
    const out: DataFormat = {
      workouts: workoutMap,
      plans,
      exercises: exerciseMap,
    };

    const serial = JSON.stringify(out);
    const filename = `gym-tracker-${getDate()}.json`;

    try {
      downloadFile(serial, filename);
    } catch {
      throw new Error("Failed to export data");
    }
  }

  async function doImport(file: File) {
    if (!file) {
      throw new Error("Expected a file");
    }

    try {
      const result = await readFile(file);
      const decoded = JSON.parse(result) as DataFormat;

      const isValid = confirm(`Does this look right?
        Workouts: ${Object.values(decoded.workouts).length}
        Planner items: ${decoded.plans.length}
        Exercises: ${Object.values(decoded.exercises).length}`);

      if (isValid) {
        importWorkouts(decoded.workouts);
        importPlans(decoded.plans);
        importExercises(decoded.exercises);
      }
    } catch {
      throw new Error("Failed to import data");
    }
  }

  return { doExport, doImport };
}
