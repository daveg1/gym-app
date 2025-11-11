import { createContext, useContext, useState } from "react";
import type { IExercise, IWorkout } from "../../models/gym";

interface IContext {
  workout: IWorkout;
  updateWorkout: (changes: Partial<IWorkout>) => void;
  addExercise: (exercise: IExercise) => void;
  updateExercise: (changes: Partial<IExercise>) => void;
  deleteExercise: (id: IExercise["id"]) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutContext = createContext<IContext>(null!);

export function WorkoutContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workout, setWorkout] = useState<IWorkout>({
    exercises: [],
    id: crypto.randomUUID() as string,
    timestamp: Date.now(),
    name: "Workout",
  });

  const updateWorkout = (changes: Partial<IWorkout>) => {
    setWorkout((current) => ({ ...current, ...changes }));
  };

  const addExercise = (value: IExercise) => {
    setWorkout((current) => {
      const copy = { ...current };
      copy.exercises = [...copy.exercises, value];
      return copy;
    });
  };

  const updateExercise = (changes: Partial<IExercise>) => {
    setWorkout((current) => {
      const copy = { ...current };
      const idx = copy.exercises.findIndex((ex) => ex.id === changes.id);
      Object.assign(copy.exercises[idx], changes);
      return copy;
    });
  };

  const deleteExercise = (id: IExercise["id"]) => {
    setWorkout((current) => {
      const copy = { ...current };
      const idx = copy.exercises.findIndex((ex) => ex.id === id);
      copy.exercises.splice(idx, 1);
      return copy;
    });
  };

  const [isEditing, setIsEditing] = useState(false);

  const value = {
    workout,
    updateWorkout,
    addExercise,
    updateExercise,
    deleteExercise,
    isEditing,
    setIsEditing,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
