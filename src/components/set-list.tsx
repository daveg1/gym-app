import { useMemo } from "react";
import type { ISet } from "../models/gym";
import { SetItem } from "./set-item";

export function SetList({ sets }: { sets: ISet[] }) {
  const sorted = useMemo(() => {
    return sets.sort((a, b) =>
      a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0,
    );
  }, [sets]);

  return (
    <>
      {sorted.map((s) => (
        <SetItem key={s.timestamp} data={s} />
      ))}
    </>
  );
}
