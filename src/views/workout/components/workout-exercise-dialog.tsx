import { useMemo, useState } from "react";
import { Button, Text } from "../../../components/ui";
import { Dialog } from "../../../components/ui/dialog";
import { useExerciseStore } from "../../../hooks";
import { useWorkoutContext } from "../workout.context";
import { muscleGroupValues } from "../../../models/gym";
import clsx from "clsx";

const FormGroups = {
  existing: "existing",
  created: "created",
} as const;

export function WorkoutExerciseDialog() {
  const { dialogRef, addExercise } = useWorkoutContext();
  const { exerciseMap, createExercise } = useExerciseStore();
  const suggestions = useMemo(
    () => Object.values(exerciseMap).flatMap((exercise) => exercise),
    [exerciseMap],
  );

  const [radioGroup, setRadioGroup] = useState<keyof typeof FormGroups>(
    suggestions.length ? FormGroups.existing : FormGroups.created,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (radioGroup === "existing") {
      // for now copy the exercise
      // but in future store the id
      const existingId = `${data.get("exercise-existing")}`;
      const exercise = exerciseMap[existingId];
      addExercise(exercise);
    } else {
      const name = `${data.get("exercise-created")}`.trim();
      const muscle = `${data.get("exercise-muscle")}`.trim();

      if (!name || !muscle) return;

      const exercise = { id: crypto.randomUUID(), name, muscle, sets: [] };
      createExercise(exercise);
      addExercise(exercise);
    }

    dialogRef.hideDialog();
    e.currentTarget.reset();

    // TODO: save in exercise store
  };

  // TODO: Create a custom text box which shows suggestions as you type
  // TODO: create separate form components

  return (
    <Dialog title="Add exercise" ref={dialogRef}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <section className="flex flex-col gap-2">
          <label
            className={clsx("flex gap-1", !suggestions.length && "opacity-50")}
          >
            <input
              name="exercise-type"
              type="radio"
              checked={radioGroup === FormGroups.existing}
              value={FormGroups.existing}
              onChange={(e) =>
                setRadioGroup(e.currentTarget.value as keyof typeof FormGroups)
              }
              disabled={!suggestions.length}
            />
            <Text>Choose an existing one</Text>
          </label>

          <select
            name="exercise-existing"
            className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400 disabled:opacity-50"
            disabled={radioGroup !== FormGroups.existing || !suggestions.length}
          >
            {suggestions.length ? (
              suggestions.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))
            ) : (
              <option>No exercises yet</option>
            )}
          </select>
        </section>

        <section className="flex flex-col gap-2">
          <label className="flex gap-1">
            <input
              name="exercise-type"
              type="radio"
              checked={radioGroup === FormGroups.created}
              value={FormGroups.created}
              onChange={(e) =>
                setRadioGroup(e.currentTarget.value as keyof typeof FormGroups)
              }
            />
            <Text>Or create a new one:</Text>
          </label>

          <fieldset className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Text size="s">Exercise name</Text>
              <input
                name="exercise-created"
                className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400 disabled:opacity-50"
                type="text"
                placeholder="E.g. Bench press"
                autoFocus
                disabled={radioGroup !== FormGroups.created}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Text size="s">Muscle group</Text>
              <select
                name="exercise-muscle"
                className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400 disabled:opacity-50"
                disabled={radioGroup !== FormGroups.created}
              >
                {muscleGroupValues.map((muscle) => (
                  <option key={muscle} value={muscle}>
                    {muscle}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </section>

        <Button>Save</Button>
      </form>
    </Dialog>
  );
}
