import { memo, useEffect, useRef, useState } from "react";
import { SetForm } from "./set-form";
import type { IExercise, ISet } from "../../models/gym";
import clsx from "clsx";

interface Props {
  data: IExercise;
  readonly?: boolean;
  isEditing?: boolean;
  defaultOpen?: boolean;
  onAddSet?(set: ISet): void;
  onEdit?(id: IExercise["id"], changes: Partial<IExercise>): void;
}

export const Exercise = memo(
  ({
    data,
    readonly,
    isEditing,
    defaultOpen,
    onAddSet,
    onEdit,
  }: Readonly<Props>) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen ?? false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, []);

    const handleEditTitle = (
      e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    ) => {
      if (isEditing) {
        e.stopPropagation();
        const name = prompt("Enter a new name", data.name);
        if (!name) return;
        onEdit?.(data.id, { name });
      }
    };

    return (
      <article ref={ref} className="flex flex-col rounded-lg bg-gray-100">
        <header
          className="flex items-center justify-between p-4"
          onClick={() => setIsExpanded((v) => !v)}
        >
          <div className="flex gap-2">
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

            <h2
              className="text-xl font-semibold"
              onClick={(e) => handleEditTitle(e)}
            >
              {data.name}
            </h2>
          </div>
        </header>

        <main
          className={clsx(
            "flex flex-col gap-2 px-6 pb-4",
            !isExpanded && "hidden",
          )}
        >
          <div className="grid grid-cols-3 gap-2 text-sm font-semibold text-gray-500">
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
        </main>
      </article>
    );
  },
);
