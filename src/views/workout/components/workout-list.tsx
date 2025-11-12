import { Exercise } from "../../../components/shared";
import { List, Text } from "../../../components/ui";
import type { IExercise, ISet } from "../../../models/gym";
import { useWorkoutContext } from "../workout.context";

export function WorkoutList() {
  const { workout, isEditing, updateExercise, deleteExercise } =
    useWorkoutContext();

  const handleEditExercise = (
    id: IExercise["id"],
    changes: Partial<IExercise>,
  ) => {
    updateExercise({ ...changes, id });
  };

  const handleDeleteExercise = (id: IExercise["id"]) => {
    if (confirm(`Delete exercise?`)) {
      deleteExercise(id);
    }
  };

  const onAddSet = (newSet: ISet, exercise: IExercise) => {
    exercise.sets.push(newSet);
    updateExercise(exercise);
  };

  const handleEditSet = (
    id: IExercise["id"],
    setNo: number,
    changes: Partial<ISet>,
  ) => {
    const exerciseIndex = workout.exercises.findIndex((ex) => ex.id === id);
    Object.assign(workout.exercises[exerciseIndex].sets[setNo], changes);
    updateExercise(workout.exercises[exerciseIndex]);
  };

  const handleDeleteSet = (id: IExercise["id"], setNo: number) => {
    const exIndex = workout.exercises.findIndex((ex) => ex.id === id);
    // TODO: use id instead to find sets
    const setIndex = workout.exercises[exIndex].sets.findIndex(
      (_, index) => index === setNo,
    );

    if (setIndex > -1) {
      const setsCopy = [...workout.exercises[exIndex].sets];
      setsCopy.splice(setIndex, 1);

      const exercisesCopy = [...workout.exercises];
      exercisesCopy[exIndex].sets = setsCopy;

      updateExercise(exercisesCopy[exIndex]);
    }
  };

  return (
    <List>
      {workout.exercises.length ? (
        workout.exercises.map((exercise, index) => (
          <Exercise
            key={index}
            data={exercise}
            onAddSet={(newSet) => onAddSet(newSet, exercise)}
            defaultOpen={true}
            isEditing={isEditing}
            onEditExercise={handleEditExercise}
            onDeleteExercise={handleDeleteExercise}
            onEditSet={handleEditSet}
            onDeleteSet={handleDeleteSet}
          />
        ))
      ) : (
        <Text>No exercises yet, go add one</Text>
      )}
    </List>
  );
}
