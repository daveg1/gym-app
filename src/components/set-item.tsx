import { memo } from "react";
import type { ISet } from "../models/gym";

export const SetItem = memo(({ data }: { data: ISet }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span>{data.setNo}</span>
      <span>{data.reps}</span>
      <span>{data.weight}kg</span>
    </div>
  );
});
