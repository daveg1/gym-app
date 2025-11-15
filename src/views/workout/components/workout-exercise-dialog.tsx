import { useMemo, useState } from "react";
import {
  Button,
  RadioBox,
  SelectBox,
  TextBox,
  Dialog,
} from "../../../components/ui";
import { useExerciseStore } from "../../../hooks";
import { useWorkoutContext } from "../workout.context";
import { muscleGroupValues } from "../../../models";

const FormGroups = {
  existing: "existing",
  created: "created",
} as const;

export function WorkoutExerciseDialog() {
  const { dialogRef, addExercise } = useWorkoutContext();
  const { exerciseMap, createExercise, doesExist } = useExerciseStore();
  const suggestions = useMemo(
    () =>
      Object.values(exerciseMap)
        .flatMap((exercise) => exercise)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)),
    [exerciseMap],
  );

  const [radioGroup, setRadioGroup] = useState<keyof typeof FormGroups>(
    suggestions.length ? FormGroups.existing : FormGroups.created,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (radioGroup === "existing") {
      const existingId = `${data.get("exercise-existing")}`;
      addExercise(existingId);
    } else {
      const name = `${data.get("exercise-created")}`.trim();
      const muscle = `${data.get("exercise-muscle")}`.trim();

      // TODO: user feedback (e.g. toast)
      if (!name || !muscle) return;
      if (doesExist(name)) return;

      const exercise = { id: crypto.randomUUID(), name, muscle, sets: [] };
      createExercise(exercise);
      addExercise(exercise.id);
    }

    dialogRef.hideDialog();
    e.currentTarget.reset();
  };

  // TODO: Create a custom text box which shows suggestions as you type

  return (
    <Dialog title="Add exercise" ref={dialogRef}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <section className="flex flex-col gap-2">
          <RadioBox
            className={!suggestions.length ? "opacity-50" : ""}
            name="exercise-type"
            label="Choose an existing one"
            checked={radioGroup === FormGroups.existing}
            value={FormGroups.existing}
            onChange={(e) =>
              setRadioGroup(e.currentTarget.value as keyof typeof FormGroups)
            }
            disabled={!suggestions.length}
          />

          <SelectBox
            data={
              suggestions.length
                ? suggestions.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : [{ label: "No exercises yet", value: "" }]
            }
            name="exercise-existing"
            disabled={radioGroup !== FormGroups.existing || !suggestions.length}
          />
        </section>

        <section className="flex flex-col gap-2">
          <RadioBox
            name="exercise-type"
            label="Or create a new one:"
            checked={radioGroup === FormGroups.created}
            value={FormGroups.created}
            onChange={(e) =>
              setRadioGroup(e.currentTarget.value as keyof typeof FormGroups)
            }
          />

          <fieldset className="flex flex-col gap-4">
            <TextBox
              label="Exercise name"
              name="exercise-created"
              placeholder="E.g. Bench press"
              autoFocus
              disabled={radioGroup !== FormGroups.created}
            />

            <SelectBox
              label="Muscle group"
              data={muscleGroupValues.map((group) => ({
                label: group,
                value: group,
              }))}
              name="exercise-muscle"
              disabled={radioGroup !== FormGroups.created}
            />
          </fieldset>
        </section>

        <Button>Save</Button>
      </form>
    </Dialog>
  );
}
