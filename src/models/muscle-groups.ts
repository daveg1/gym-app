export const muscleGroupValues = [
  "Abs",
  "Back",
  "Biceps",
  "Calves",
  "Chest",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Hands",
  "Obliques",
  "Shoulders",
  "Thighs",
  "Traps",
  "Triceps",
  "Quads",
] as const;

export type MuscleGroups = (typeof muscleGroupValues)[number];
