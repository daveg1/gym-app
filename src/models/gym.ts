import type { MuscleGroups } from "./muscle-groups";

export interface ISet {
  reps: number;
  weight: number;
}

export interface IExercise {
  id: string;
  name: string;
  sets: ISet[];
  muscleGroup?: MuscleGroups;
}

export type IExerciseMap = Record<string, IExercise>;

export interface IWorkout {
  id: string;
  name?: string;
  exercises: IExercise[];
  timestamp: number;
}

export type IWorkoutMap = Record<string, IWorkout>;

export const MockExercises: IExercise[] = [
  {
    id: "1",
    name: "Bench press",
    sets: [
      {
        reps: 6,
        weight: 70,
      },
    ],
  },
];
