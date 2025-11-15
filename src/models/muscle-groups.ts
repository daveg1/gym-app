export const muscleGroupValues = [
  "Abs",
  "Back",
  "Biceps",
  "Calves",
  "Chest",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Hips",
  "Shoulders",
  "Traps",
  "Triceps",
  "Quads",
] as const;

export type MuscleGroups = (typeof muscleGroupValues)[number];
