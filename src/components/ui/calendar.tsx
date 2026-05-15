import clsx from "clsx";
import { useMemo } from "react";
import type { IWorkout } from "../../models";
import { addDays, getDaysInMonth, isSameDay, startOfDay, subMonths } from "date-fns";

interface CalendarProps {
  workouts: IWorkout[];
}

export function Calendar(props: CalendarProps) {
  const { workouts } = props;
  const date = useMemo(() => new Date(), []);

  //  M,  T,  W,  T,  F,  S,  S
  // -4, -3, -2, -1,  0,  1,  2,
  //  3,  4,  5,  6,  7,  8,  9,

  // dayOfWeek - (date % 7)

  const dayCells = useMemo(() => {
    const cells = [];
    const anchorIndex = date.getDay() - (date.getDate() % 7);
    const prevMonthDays = getDaysInMonth(subMonths(date, 1));

    // First cell date: go back (anchorIndex + date.getDate() - 1) days from today
    const todayIndex = anchorIndex + date.getDate() - 1;
    const firstCellDate = addDays(startOfDay(date), -todayIndex);

    for (let day = 0; day < 30; day++) {
      const cellDate = day - anchorIndex + 1;
      const cellDateObj = addDays(firstCellDate, day);
      const hasWorkout = workouts.some((w) => isSameDay(w.timestamp, cellDateObj));

      cells.push({
        date: cellDate < 1 ? prevMonthDays + cellDate : cellDate,
        hasWorkout,
        rowBreak: !!(day % 7),
      });
    }

    return cells;
  }, [date, workouts]);

  // Split flat list into week rows
  const weekCells = useMemo(() => {
    const result = [];
    for (let i = 0; i < dayCells.length; i += 7) {
      result.push(dayCells.slice(i, i + 7));
    }
    return result;
  }, [dayCells]);

  return (
    <table className="w-full text-center">
      <thead>
        <tr>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
          <th>S</th>
        </tr>
      </thead>

      <tbody>
        {weekCells.map((week, wIdx) => (
          <tr key={wIdx}>
            {week.map((day, dIdx) => (
              <td key={dIdx} className="relative h-8 w-[calc(100%/7)]">
                <span
                  className={clsx(
                    "inline-block size-2 rounded-full",
                    day.hasWorkout ? "bg-red-400" : "bg-gray-300",
                  )}
                ></span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
