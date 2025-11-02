// export const MuscleGroupValues = [
//   "Back",
//   "Chest",
//   "Shoulders",
//   "Triceps",
//   "Biceps",
//   "Core",
//   "Forearms",
//   "Quads",
//   "Calves",
//   "Hamstring",
// ] as const;

// export type MuscleGroups = (typeof MuscleGroupValues)[number];

export interface ISet {
  reps: number;
  weight: number;
}

export interface IExercise {
  name: string;
  sets: ISet[];
}

export interface IWorkout {
  id: string;
  exercises: IExercise[];
  timestamp: number;
}

export type IWorkoutMap = Record<string, IWorkout>;

export const MockExercises: IExercise[] = [
  {
    name: "Bench press",
    sets: [
      {
        reps: 6,
        weight: 70,
      },
    ],
  },
];
