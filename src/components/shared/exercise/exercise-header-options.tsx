import { DeleteIcon } from "../../icons";
import { Button } from "../../ui";

interface Props {
  isEditing?: boolean;
  onDeleteExercise?(): void;
}

export function ExerciseHeaderOptions({ isEditing, onDeleteExercise }: Props) {
  return (
    <>
      {isEditing && (
        <Button
          icon
          mode="danger"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteExercise?.();
          }}
        >
          <DeleteIcon />
        </Button>
      )}
    </>
  );
}
