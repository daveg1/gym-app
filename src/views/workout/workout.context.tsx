import { createContext, useContext, useState } from "react";
import type { IExercise, IWorkout } from "../../models/gym";
import { WORKOUT_SESSION_KEY } from "../../constants";

interface IContext {
  workout: IWorkout;
  updateWorkout: (changes: Partial<IWorkout>) => void;
  addExercise: (exercise: IExercise) => void;
  updateExercise: (changes: Partial<IExercise>) => void;
  deleteExercise: (id: IExercise["id"]) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  clearSession: () => void;
}

const WorkoutContext = createContext<IContext>(null!);

const serialise = (data: IWorkout) => {
  localStorage.setItem(WORKOUT_SESSION_KEY, JSON.stringify(data));
};

const deserialise = (): IWorkout => {
  return JSON.parse(
    localStorage.getItem(WORKOUT_SESSION_KEY) ?? "{}",
  ) as IWorkout;
};

export function WorkoutContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [workout, setWorkout] = useState<IWorkout>({
    ...{
      exercises: [],
      id: crypto.randomUUID() as string,
      timestamp: Date.now(),
      name: "Workout",
    },
    ...(deserialise() ?? {}),
  });

  const updateWorkout = (changes: Partial<IWorkout>) => {
    setWorkout((current) => {
      const data = { ...current, ...changes };
      serialise(data);
      return data;
    });
  };

  const addExercise = (value: IExercise) => {
    setWorkout((current) => {
      const data = { ...current };
      data.exercises = [...data.exercises, value];
      serialise(data);
      return data;
    });
  };

  const updateExercise = (changes: Partial<IExercise>) => {
    setWorkout((current) => {
      const data = { ...current };
      const idx = data.exercises.findIndex((ex) => ex.id === changes.id);
      Object.assign(data.exercises[idx], changes);
      serialise(data);
      return data;
    });
  };

  const deleteExercise = (id: IExercise["id"]) => {
    setWorkout((current) => {
      const data = { ...current };
      const idx = data.exercises.findIndex((ex) => ex.id === id);
      data.exercises.splice(idx, 1);
      serialise(data);
      return data;
    });
  };

  const clearSession = () => {
    localStorage.removeItem(WORKOUT_SESSION_KEY);
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
    clearSession,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
