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

  // TODO: add delete button for sets during workout

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
          />
        ))
      ) : (
        <Text>No exercises yet, go add one</Text>
      )}
    </List>
  );
}
