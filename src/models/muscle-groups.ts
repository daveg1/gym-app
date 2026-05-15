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
  "Lats",
  "Lowerback",
  "Obliques",
  "Shoulders Front",
  "Shoulders Rear",
  "Thighs",
  "Traps",
  "Traps Middle",
  "Triceps",
  "Quads",
] as const;

export type MuscleGroups = (typeof muscleGroupValues)[number];
