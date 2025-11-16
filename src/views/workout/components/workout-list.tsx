import { Exercise } from "../../../components/shared";
import { List, Text } from "../../../components/ui";
// import type { IExercise } from "../../../models";
import { useWorkoutContext } from "../workout.context";

export function WorkoutList() {
  const { workout, isEditing, deleteExercise, addSet, editSet, deleteSet } =
    useWorkoutContext();

  // const handleEditExercise = (id: string, changes: Partial<IExercise>) => {
  // TODO: changes made via exercise store
  // updateExercise({ ...changes, id });
  // };

  const handleDeleteExercise = (id: string) => {
    if (confirm(`Delete exercise?`)) {
      deleteExercise(id);
    }
  };

  return (
    <List>
      {workout.exercises.length ? (
        workout.exercises.map((exercise, index) => (
          <Exercise
            key={index}
            data={exercise}
            defaultOpen={true}
            isEditing={isEditing}
            // onEditExercise={handleEditExercise}
            onDeleteExercise={handleDeleteExercise}
            onAddSet={(newSet) => addSet(newSet, exercise)}
            onEditSet={editSet}
            onDeleteSet={deleteSet}
          />
        ))
      ) : (
        <Text>No exercises yet, go add one</Text>
      )}
    </List>
  );
}
