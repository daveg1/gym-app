import { useMemo } from "react";
import { Button, Text } from "../../../components/ui";
import { Dialog } from "../../../components/ui/dialog";
import { useStorage } from "../../../hooks";
import { useWorkoutContext } from "../workout.context";

export function WorkoutExerciseDialog() {
  const { dialogRef, addExercise } = useWorkoutContext();
  const { workoutMap } = useStorage();
  const suggestions = useMemo(
    () => [
      ...new Set(
        Object.values(workoutMap).flatMap((workout) =>
          workout.exercises.map((ex) => ex.name),
        ),
      ),
    ],
    [workoutMap],
  );

  // TODO: store exercises in separate storage key and query that
  // TODO: to ensure consistency
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const suggested = `${data.get("exercise-suggested")}`;
    const created = `${data.get("exercise-created")}`;

    const name = created ? created : suggested;
    addExercise({ id: crypto.randomUUID(), name, sets: [] });
    dialogRef.hideDialog();
  };

  // TODO: Create a custom text box which shows suggestions as you type

  return (
    <Dialog title="Add exercise" ref={dialogRef}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Text>Choose an existing one:</Text>
          <select
            name="exercise-suggested"
            className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400 disabled:opacity-50"
            disabled={!suggestions.length}
          >
            {suggestions.length ? (
              suggestions.map((sug) => (
                <option key={sug} value={sug}>
                  {sug}
                </option>
              ))
            ) : (
              <option>No exercises yet</option>
            )}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <Text>Or create a new one:</Text>
          <input
            name="exercise-created"
            className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400"
            type="text"
            placeholder="E.g. Bench press"
            autoFocus
          />
        </div>

        <Button>Save</Button>
      </form>
    </Dialog>
  );
}
