import { useNavigate } from "react-router";
import {
  Button,
  Header,
  OverflowMenu,
  OverflowMenuItem,
} from "../../../components/ui";
import { useWorkoutContext } from "../workout.context";
import { EditIcon, SaveIcon } from "../../../components/icons";

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
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
                    </svg>
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePause();
                  }}
                />
                <OverflowMenuItem
                  text="Cancel"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="m5.965 4.904 9.131 9.131a6.5 6.5 0 0 0-9.131-9.131Zm8.07 10.192L4.904 5.965a6.5 6.5 0 0 0 9.131 9.131ZM4.343 4.343a8 8 0 1 1 11.314 11.314A8 8 0 0 1 4.343 4.343Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
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
