import { useNavigate } from "react-router";
import { Exercise } from "../../../components/shared";
import { List, Text } from "../../../components/ui";
import { useWorkoutStore } from "../../../hooks";
import type { IExercise, ISet, IWorkout } from "../../../models";

interface Props {
  workout: IWorkout;
  isEditing: boolean;
}

export function DetailsList({ workout, isEditing }: Props) {
  const { addOrSaveWorkout, deleteById } = useWorkoutStore();
  const navigate = useNavigate();

  const handleEditExercise = (
    exerciseId: string,
    changes: Partial<IExercise>,
  ) => {
    const exerciseIndex = workout.exercises.findIndex(
      (ex) => ex.id === exerciseId,
    );
    Object.assign(workout.exercises[exerciseIndex], changes);
    addOrSaveWorkout({ ...workout });
  };

  const handleDeleteExercise = (exerciseId: string) => {
    if (confirm(`Delete exercise?`)) {
      if (workout.exercises.length > 1) {
        const exerciseIndex = workout.exercises.findIndex(
          (ex) => ex.id === exerciseId,
        );
        workout.exercises.splice(exerciseIndex, 1);
        addOrSaveWorkout({ ...workout });
      } else {
        if (
          confirm(
            "This is your last exercise. Deleting this will delete the entire workout. Continue?",
          )
        ) {
          deleteById(workout.id);
          navigate("/");
        }
      }
    }
  };

  const handleEditSet = (
    exerciseId: string,
    setNo: number,
    changes: Partial<ISet>,
  ) => {
    const exerciseIndex = workout.exercises.findIndex(
      (ex) => ex.id === exerciseId,
    );
    Object.assign(workout.exercises[exerciseIndex].sets[setNo], changes);
    addOrSaveWorkout({ ...workout });
  };

  const handleDeleteSet = (exerciseId: string, setNo: number) => {
    const exerciseIndex = workout.exercises.findIndex(
      (ex) => ex.id === exerciseId,
    );
    const setIndex = workout.exercises[exerciseIndex].sets.findIndex(
      (_, index) => index === setNo,
    );

    if (setIndex > -1) {
      const setsCopy = [...workout.exercises[exerciseIndex].sets];
      setsCopy.splice(setIndex, 1);

      const exercisesCopy = [...workout.exercises];
      exercisesCopy[exerciseIndex].sets = setsCopy;

      workout.exercises = exercisesCopy;

      addOrSaveWorkout({ ...workout });
    }
  };

  return (
    <List hasFade>
      {workout.exercises.length ? (
        workout.exercises.map((exercise, index) => (
          <Exercise
            key={index}
            data={exercise}
            defaultOpen
            hideSetForm
            isEditing={isEditing}
            onEditExercise={handleEditExercise}
            onDeleteExercise={handleDeleteExercise}
            onEditSet={handleEditSet}
            onDeleteSet={handleDeleteSet}
          />
        ))
      ) : (
        <Text>This workout is empty</Text>
      )}
    </List>
  );
}
