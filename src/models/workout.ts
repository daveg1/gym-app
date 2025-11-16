import type { IExercise } from "./exercise";

export interface ISet {
  reps: number;
  weight: number;
}

export interface IWorkoutExercise {
  id: IExercise["id"];
  sets: ISet[];
}

export interface IWorkout {
  id: string;
  name?: string;
  exercises: IWorkoutExercise[];
  timestamp: number;
}

export type IWorkoutMap = Record<string, IWorkout>;
