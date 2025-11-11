import { createContext, useContext, useState } from "react";
import type { IExercise } from "../../models/gym";

interface IContext {
  sessionId: string;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  exercises: IExercise[];
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
  const [date, setDate] = useState(new Date());
  const hours = date.getHours();
  const timeOfDay =
    hours < 12 ? "Morning" : hours < 17 ? "Afternoon" : "Evening";

  const [title, setTitle] = useState(`${timeOfDay} workout`);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const sessionId = crypto.randomUUID() as string;

  const addExercise = (value: IExercise) => {
    setExercises((current) => [...current, value]);
  };

  const updateExercise = (changes: Partial<IExercise>) => {
    setExercises((current) => {
      const copy = [...current];

      const idx = copy.findIndex((ex) => ex.id === changes.id);
      Object.assign(copy[idx], changes);

      return copy;
    });
  };

  const deleteExercise = (id: IExercise["id"]) => {
    setExercises((current) => {
      const copy = [...current];

      const idx = copy.findIndex((ex) => ex.id === id);
      copy.splice(idx, 1);

      return copy;
    });
  };

  const [isEditing, setIsEditing] = useState(false);

  const value = {
    sessionId,
    date,
    setDate,
    title,
    setTitle,
    exercises,
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
