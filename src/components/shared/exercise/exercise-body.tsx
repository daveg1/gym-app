import clsx from "clsx";
import type { IExercise, ISet } from "../../../models/gym";
import { Text } from "../../ui";
import { DeleteIcon } from "../../icons";

interface Props {
  data: IExercise;
  isEditing?: boolean;
  hideSetForm?: boolean;
  onPropertyClick?(index: number, prop: keyof ISet): void; // todo: change index to id?
  onSetDelete?(index: number): void;
}

export function ExerciseBody({
  data,
  isEditing,
  hideSetForm,
  onPropertyClick,
  onSetDelete: onPropertyDelete,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <Text size="s">SET</Text>
        <Text size="s">REPS</Text>
        <Text size="s">KG</Text>
      </div>

      <div className="flex flex-col gap-2">
        {!data.sets.length && hideSetForm && <Text>No sets to display</Text>}

        {!!data.sets.length &&
          data.sets.map((set, index) => (
            <div
              key={index}
              className={clsx(
                "grid gap-4",
                isEditing ? "grid-cols-4" : "grid-cols-3",
              )}
            >
              <span>{index + 1}</span>

              <span
                className={clsx(
                  "outline outline-offset-2",
                  !isEditing && "outline-transparent",
                  isEditing &&
                    "relative flex h-8 items-center rounded outline-amber-400",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onPropertyClick?.(index, "reps");
                }}
              >
                {set.reps} reps
              </span>

              <span
                className={clsx(
                  "outline outline-offset-2",
                  !isEditing && "outline-transparent",
                  isEditing &&
                    "relative flex h-8 items-center rounded outline-amber-400",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onPropertyClick?.(index, "weight");
                }}
              >
                {set.weight}kg
              </span>

              {/* TODO: <Button size="s" /> */}
              {isEditing && (
                <button
                  className="flex items-center justify-center rounded bg-red-100 text-red-500"
                  onClick={() => onPropertyDelete?.(index)}
                >
                  <DeleteIcon size="s" />
                </button>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
