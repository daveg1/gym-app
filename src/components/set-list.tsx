import { memo } from "react";
import type { ISet } from "../models/gym";

export const SetList = memo(({ sets }: { sets: ISet[] }) => {
  return sets.map((set, index) => (
    <div key={index} className="grid grid-cols-3 gap-2">
      <span>{index + 1}</span>
      <span>{set.reps} reps</span>
      <span>{set.weight}kg</span>
    </div>
  ));
});
