import { memo } from "react";
import type { ISet } from "../models/gym";

export const SetItem = memo(({ data }: { data: ISet }) => {
  return (
    <div>
      {data.target}: {data.reps} × {data.weight}kg
    </div>
  );
});
