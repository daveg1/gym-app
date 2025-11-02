import { memo, useState } from "react";
import { SetForm } from "./set-form";
import type { IExercise, ISet } from "../models/gym";
import clsx from "clsx";

interface Props {
  data: IExercise;
  readonly?: boolean;
  onAddSet?: (exercise: ISet) => void;
}

export const Exercise = memo(
  ({ data, readonly, onAddSet }: Readonly<Props>) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <section className={clsx("flex flex-col gap-4", !isExpanded && "mb-4")}>
        <header
          className="flex items-center gap-2 p-4"
          onClick={() => setIsExpanded((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={clsx("size-6", isExpanded && "rotate-180")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          <h2 className="text-lg font-semibold">{data.name}</h2>
        </header>

        <div
          className={clsx("flex flex-col gap-2 px-6", isExpanded && "hidden")}
        >
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
            <span>SET</span>
            <span>REPS</span>
            <span>KG</span>
          </div>

          <div className="flex flex-col gap-2">
            {data.sets.map((set, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <span>{index + 1}</span>
                <span>{set.reps} reps</span>
                <span>{set.weight}kg</span>
              </div>
            ))}

            {!readonly && (
              <SetForm
                setNo={data.sets.length + 1}
                onSubmit={(value) => onAddSet?.(value)}
              />
            )}
          </div>
        </div>
      </section>
    );
  },
);
