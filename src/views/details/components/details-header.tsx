import { useNavigate } from "react-router";
import { Button, Header } from "../../../components/ui";
import { useWorkoutStore } from "../../../hooks";
import { formatDate } from "../../../utils";
import { DeleteIcon, EditIcon, SaveIcon } from "../../../components/icons";

interface Props {
  workoutId: string;
  isEditing: boolean;
  setIsEditing: (v: (v: boolean) => boolean) => void;
}

export function DetailsHeader({ workoutId, isEditing, setIsEditing }: Props) {
  const { addOrSaveWorkout, getById, deleteById } = useWorkoutStore();
  const navigate = useNavigate();
  const workout = getById(workoutId);

  // Avoid TypeErrors when deleting workout
  if (!workout) return;

  const handleEditTitle = () => {
    if (!isEditing) return;

    const newTitle = prompt("Edit title", workout.name);
    if (newTitle) {
      addOrSaveWorkout({ ...workout, name: newTitle });
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this workout?")) {
      deleteById(workout.id);
      navigate("/");
    }
  };

  return (
    <Header
      isEditing={isEditing}
      onClick={handleEditTitle}
      text={workout.name ?? "Workout"}
      caption={formatDate(workout.timestamp)}
      rightSide={
        <menu className="flex gap-4">
          {isEditing && (
            <Button
              icon
              mode="danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <DeleteIcon />
            </Button>
          )}

          <Button
            icon
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing((v) => !v);
            }}
          >
            {isEditing ? <SaveIcon /> : <EditIcon />}
          </Button>
        </menu>
      }
    />
  );
}
