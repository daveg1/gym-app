import { createContext, useContext, useState } from "react";
import type { IWorkout } from "../../models";
import { TEMP_SESSION_KEY } from "../../constants";
import { useDialogRef, type DialogRef } from "../../components/ui/modal/dialog";

interface IContext {
  workout: IWorkout;
  updateWorkout: (changes: Partial<IWorkout>) => void;
  addExercise: (id: string) => void;
  // updateExercise: (changes: Partial<IExercise>) => void;
  deleteExercise: (id: string) => void;
  isEditing: boolean;
  dialogRef: DialogRef;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  clearSession: () => void;
}

const WorkoutContext = createContext<IContext>(null!);

const serialise = (data: IWorkout) => {
  localStorage.setItem(TEMP_SESSION_KEY, JSON.stringify(data));
};

const deserialise = (): IWorkout => {
  return JSON.parse(localStorage.getItem(TEMP_SESSION_KEY) ?? "{}") as IWorkout;
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

  const addExercise = (id: string) => {
    setWorkout((current) => {
      const data = { ...current };
      data.exercises = [...data.exercises, { id, sets: [] }];
      serialise(data);
      return data;
    });
  };

  // const updateExercise = (changes: Partial<IExercise>) => {
  // TODO: move this method to exercise store and reflect changes to UI
  // setWorkout((current) => {
  //   const data = { ...current };
  //   const index = data.exercises.findIndex((ex) => ex.id === changes.id);
  //   const exercisesCopy = [...data.exercises];
  //   exercisesCopy[index] = { ...exercisesCopy[index], ...changes };
  //   data.exercises = exercisesCopy;
  //   serialise(data);
  //   return data;
  // });
  // };

  const deleteExercise = (id: string) => {
    setWorkout((current) => {
      const data = { ...current };
      const index = data.exercises.findIndex((ex) => ex.id === id);
      const exercisesCopy = [...data.exercises];
      exercisesCopy.splice(index, 1);
      data.exercises = exercisesCopy;
      serialise(data);
      return data;
    });
  };

  const clearSession = () => {
    localStorage.removeItem(TEMP_SESSION_KEY);
  };

  const [isEditing, setIsEditing] = useState(false);
  const dialogRef = useDialogRef();

  const value = {
    workout,
    updateWorkout,
    addExercise,
    // updateExercise,
    deleteExercise,
    isEditing,
    dialogRef,
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
