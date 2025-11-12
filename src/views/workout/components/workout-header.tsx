import { useNavigate } from "react-router";
import {
  Button,
  Header,
  OverflowMenu,
  OverflowMenuItem,
} from "../../../components/ui";
import { useWorkoutContext } from "../workout.context";

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
              {isEditing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              )}
            </Button>
          }

          <OverflowMenu
            items={
              <>
                <OverflowMenuItem
                  text="Pause"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePause();
                  }}
                />
                <OverflowMenuItem
                  text="Cancel"
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
