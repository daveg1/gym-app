import type { ISet, IWorkoutExercise } from "../../../models";
import { SetForm } from "../set-form";

interface Props {
  data: IWorkoutExercise;
  onAddSet?(value: ISet): void;
}

export function ExerciseFooter({ data, onAddSet }: Props) {
  return (
    <SetForm
      setNo={data.sets.length + 1}
      onSubmit={(value) => onAddSet?.(value)}
    />
  );
}
