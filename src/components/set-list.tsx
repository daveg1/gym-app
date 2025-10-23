import { useMemo } from "react";
import type { ISet } from "../models/gym";
import { SetItem } from "./set-item";

export function SetList({ sets }: { sets: ISet[] }) {
  const sorted = useMemo(() => {
    return sets.sort((a, b) =>
      a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0,
    );
  }, [sets]);

  // Insert exercise string before each block of exercises
  // Assume flat list is already sorted and has contiguous blocks of exercises.
  const items = useMemo(() => {
    const list = [];
    let prevExercise = "";
    let setNo = -1;
    for (let i = 0; i < sets.length; i++) {
      if (sets[i].exercise !== prevExercise) {
        list.push(sets[i].exercise);
        prevExercise = sets[i].exercise;
        setNo = 0;
      }
      sets[i].setNo = ++setNo;
      list.push(sets[i]);
    }
    return list;
  }, [sets]);

  return (
    <div className="px-4">
      {items.map((item) =>
        typeof item === "string" ? (
          <h2 key={item} className="text-lg font-semibold">
            {item}
          </h2>
        ) : (
          <SetItem key={item.timestamp} data={item} />
        ),
      )}
    </div>
  );
}
