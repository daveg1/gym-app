export type MuscleGroups =
  | "Back"
  | "Chest"
  | "Shoulders"
  | "Triceps"
  | "Biceps"
  | "Core"
  | "Forearms"
  | "Quads"
  | "Calves"
  | "Hamstring";

export interface GymSet {
  target: MuscleGroups;
  reps: number;
  weightKg: number;
  timestamp: number;
}

export const MockSets: GymSet[] = [
  {
    target: "Chest",
    reps: 6,
    weightKg: 70,
    timestamp: 1761086002743,
  },
];
