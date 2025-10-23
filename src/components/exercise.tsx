import { useState } from "react";
import type { Exercise } from "../screens";
import { SetForm } from "./set-form";

export function Exercise({ data }: { data: Exercise }) {
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
          {sets.map((set, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <span>{index + 1}</span>
              <span>{set.reps} reps</span>
              <span>{set.weight}kg</span>
            </div>
          ))}

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
}
