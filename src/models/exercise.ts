import type { MuscleGroups } from "./muscle-groups";

export interface IExercise {
  id: string;
  name: string;
  muscleGroup?: MuscleGroups;
}

export type IExerciseMap = Record<string, IExercise>;
