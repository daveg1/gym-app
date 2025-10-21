export const MuscleGroupValues = [
  "Back",
  "Chest",
  "Shoulders",
  "Triceps",
  "Biceps",
  "Core",
  "Forearms",
  "Quads",
  "Calves",
  "Hamstring",
] as const;

export type MuscleGroups = (typeof MuscleGroupValues)[number];

export interface ISet {
  target: MuscleGroups;
  reps: number;
  weight: number;
  timestamp: number;
}

export const MockSets: ISet[] = [
  {
    target: "Chest",
    reps: 6,
    weight: 70,
    timestamp: 1761086002743,
  },
];
