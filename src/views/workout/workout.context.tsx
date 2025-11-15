import { createContext, useContext, useState } from "react";
import type { ISet, IWorkout, IWorkoutExercise } from "../../models";
import { TEMP_SESSION_KEY } from "../../constants";
import { useDialogRef, type DialogRef } from "../../components/ui/modal/dialog";

interface IContext {
  workout: IWorkout;
  updateWorkout: (changes: Partial<IWorkout>) => void;

  addExercise(id: string): void;
  updateExercise(changes: Partial<IWorkoutExercise>): void;
  deleteExercise(id: string): void;

  addSet(set: ISet, exercise: IWorkoutExercise): void;
  editSet(exerciseId: string, setNo: number, changes: Partial<ISet>): void;
  deleteSet(exerciseId: string, setNo: number): void;

  dialogRef: DialogRef;
  isEditing: boolean;
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
  const dialogRef = useDialogRef();
  const [isEditing, setIsEditing] = useState(false);
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

  /**
   * Exercises
   */

  const addExercise = (id: string) => {
    setWorkout((current) => {
      const data = { ...current };
      data.exercises = [...data.exercises, { id, sets: [] }];
      serialise(data);
      return data;
    });
  };

  const updateExercise = (changes: Partial<IWorkoutExercise>) => {
    setWorkout((current) => {
      const data = { ...current };
      const index = data.exercises.findIndex((ex) => ex.id === changes.id);
      const exercisesCopy = [...data.exercises];
      exercisesCopy[index] = { ...exercisesCopy[index], ...changes };
      data.exercises = exercisesCopy;
      serialise(data);
      return data;
    });
  };

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

  /**
   * Sets
   */

  function addSet(newSet: ISet, exercise: IWorkoutExercise) {
    exercise.sets = [...exercise.sets, newSet];
    updateExercise(exercise);
  }

  function editSet(exerciseId: string, setNo: number, changes: Partial<ISet>) {
    const index = workout.exercises.findIndex((ex) => ex.id === exerciseId);
    Object.assign(workout.exercises[index].sets[setNo], changes);
    updateExercise(workout.exercises[index]);
  }

  function deleteSet(exerciseId: string, setNo: number) {
    const index = workout.exercises.findIndex((ex) => ex.id === exerciseId);
    const setIndex = workout.exercises[index].sets.findIndex(
      (_, index) => index === setNo,
    );

    if (setIndex > -1) {
      const setsCopy = [...workout.exercises[index].sets];
      setsCopy.splice(setIndex, 1);

      const exercisesCopy = [...workout.exercises];
      exercisesCopy[index].sets = setsCopy;

      updateExercise(exercisesCopy[index]);
    }
  }

  const clearSession = () => {
    localStorage.removeItem(TEMP_SESSION_KEY);
  };

  const value = {
    workout,
    updateWorkout,

    addExercise,
    updateExercise,
    deleteExercise,

    addSet,
    editSet,
    deleteSet,

    dialogRef,
    isEditing,
    setIsEditing,
    clearSession,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
