import clsx from "clsx";
import type { IExercise, ISet } from "../../../models/gym";
import { Text } from "../../ui";

interface Props {
  data: IExercise;
  isEditing?: boolean;
  onPropertyEditClick?(
    index: number, // todo: change to id?
    prop: keyof ISet,
  ): void;
}

export function ExerciseBody({
  data,
  isEditing,
  onPropertyEditClick: onPropertyClick,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <Text size="s">SET</Text>
        <Text size="s">REPS</Text>
        <Text size="s">KG</Text>
      </div>

      <div className="flex flex-col gap-2">
        {data.sets.map((set, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <span>{index + 1}</span>

            <span
              className={clsx(
                "outline outline-offset-2 transition-all",
                !isEditing && "outline-transparent",
                isEditing && "relative rounded outline-amber-400",
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
                "outline outline-offset-2 transition-all",
                !isEditing && "outline-transparent",
                isEditing && "relative rounded outline-amber-400",
              )}
              onClick={(e) => {
                e.stopPropagation();
                onPropertyClick?.(index, "weight");
              }}
            >
              {set.weight}kg
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
