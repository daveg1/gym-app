import { memo, useState } from "react";
import { SetForm } from "./set-form";
import type { IExercise } from "../models/gym";
import { SetList } from "./set-list";
import clsx from "clsx";

export const Exercise = memo(({ data }: { data: IExercise }) => {
  const [sets, setSets] = useState(data.sets);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className={clsx(
        "flex flex-col gap-4",
        isExpanded ? "h-[60px] overflow-hidden" : "mb-8",
      )}
    >
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

      <div className="flex flex-col gap-2 px-4">
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
          <span>SET</span>
          <span>REPS</span>
          <span>KG</span>
        </div>

        <div className="flex flex-col gap-2">
          <SetList sets={sets} />

          <SetForm
            setNo={sets.length + 1}
            onSubmit={(newS) => {
              setSets((s) => [...s, newS]);
            }}
          />
        </div>
      </div>
    </section>
  );
});
