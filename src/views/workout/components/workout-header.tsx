import { useNavigate } from "react-router";
import {
  Button,
  Header,
  OverflowMenu,
  OverflowMenuItem,
} from "../../../components/ui";
import { useWorkoutContext } from "../workout.context";
import {
  CancelIcon,
  EditIcon,
  PauseIcon,
  SaveIcon,
} from "../../../components/icons";

export function WorkoutHeader() {
  const { workout, updateWorkout, isEditing, setIsEditing, clearSession } =
    useWorkoutContext();
  const navigate = useNavigate();

  const handlePause = () => {
    updateWorkout(workout);
    navigate("/");
  };

  const handleCancel = () => {
    if (
      workout.exercises.length &&
      !confirm("Cancel workout? Your session will be discarded")
    ) {
      return;
    }

    clearSession();
    navigate("/");
  };

  const handleEditWorkoutTitle = () => {
    if (!isEditing) return;

    const name = prompt("Edit title", workout.name);
    if (name) {
      updateWorkout({ name });
    }
  };

  return (
    <Header
      isEditing={isEditing}
      onClick={() => handleEditWorkoutTitle()}
      text={workout.name ?? ""}
      rightSide={
        <div className="flex gap-2">
          {
            <Button
              icon
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing((v) => !v);
              }}
            >
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </Button>
          }

          <OverflowMenu
            disabled={isEditing}
            items={
              <>
                <OverflowMenuItem
                  text="Pause"
                  icon={<PauseIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePause();
                  }}
                />
                <OverflowMenuItem
                  text="Cancel"
                  icon={<CancelIcon />}
                  mode="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel();
                  }}
                />
              </>
            }
          />
        </div>
      }
    />
  );
}
