import { Exercise } from "../../../components/shared";
import { List, Text } from "../../../components/ui";
import type { IExercise, ISet } from "../../../models/gym";
import { useWorkoutContext } from "../workout.context";

export function WorkoutList() {
  const { exercises, isEditing, setIsEditing, ...crud } = useWorkoutContext();

  const handleEditExercise = (
    id: IExercise["id"],
    changes: Partial<IExercise>,
  ) => {
    crud.updateExercise({ ...changes, id });
  };

  const handleDeleteExercise = (id: IExercise["id"]) => {
    if (confirm(`Delete exercise?`)) {
      if (exercises.length === 1) setIsEditing(false);
      crud.deleteExercise(id);
    }
  };

  const onAddSet = (newSet: ISet, exercise: IExercise) => {
    exercise.sets.push(newSet);
    crud.updateExercise(exercise);
  };

  const handleEditSet = (
    id: IExercise["id"],
    setNo: number,
    changes: Partial<ISet>,
  ) => {
    const exerciseIndex = exercises.findIndex((ex) => ex.id === id);
    Object.assign(exercises[exerciseIndex].sets[setNo], changes);
    crud.updateExercise(exercises[exerciseIndex]);
  };

  // TODO: add delete button for sets during workout

  return (
    <List>
      {exercises.length ? (
        exercises.map((exercise, index) => (
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
