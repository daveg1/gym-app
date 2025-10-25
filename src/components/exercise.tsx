import { memo, useState } from "react";
import { SetForm } from "./set-form";
import type { IExercise } from "../models/gym";
import { SetList } from "./set-list";

export const Exercise = memo(({ data }: { data: IExercise }) => {
  const [sets, setSets] = useState(data.sets);

  return (
    <section className="px-4">
      <h2 className="text-lg font-semibold">{data.name}</h2>

      <div className="mt-4 flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
          <span>SET</span>
          <span>REPS</span>
          <span>KG</span>
        </div>

        <div className="flex flex-col gap-2">
          <SetList sets={sets} />

          <SetForm
            setNo={data.sets.length + 1}
            onSubmit={(newS) => {
              setSets((s) => [...s, newS]);
            }}
          />
        </div>
      </div>
    </section>
  );
});
