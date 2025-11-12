import clsx from "clsx";
import type { IExercise, ISet } from "../../../models/gym";
import { Text } from "../../ui";

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
                  if (isEditing) onPropertyClick?.(index, "reps");
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
