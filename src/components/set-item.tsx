import { memo } from "react";
import type { GymSet } from "../models/gym";

export const SetItem = memo(({ data }: { data: GymSet }) => {
  return (
    <div>
      {data.target}: {data.reps} × {data.weightKg}kg
    </div>
  );
});
