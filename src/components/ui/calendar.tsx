import clsx from "clsx";
import { useMemo } from "react";

function getNumDaysOfMonth(month: number) {
  // TODO: leap year
  if (month === 1) return 28;
  if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31;
  return 30;
}

export function Calendar() {
  const date = useMemo(() => new Date(), []);

  //  M,  T,  W,  T,  F,  S,  S
  // -4, -3, -2, -1,  0,  1,  2,
  //  3,  4,  5,  6,  7,  8,  9,

  // dayOfWeek - (date % 7)

  const dayCells = useMemo(() => {
    const cells = [];
    const anchor = date.getDay() - (date.getDate() % 7);
    const today = anchor + date.getDate() - 1;
    const prevMonthDays = getNumDaysOfMonth(date.getMonth() - 1);

    for (let day = 0; day < 30; day++) {
      const cellDate = day - anchor + 1;

      cells.push({
        date: cellDate < 1 ? prevMonthDays + cellDate : cellDate,
        isToday: day === today,
        rowBreak: !!(day % 7),
      });
    }

    return cells;
  }, [date]);

  const monthCells = useMemo(() => {
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
        {monthCells.map((week, wIdx) => (
          <tr key={wIdx}>
            {week.map((day, dIdx) => (
              <td key={dIdx} className="relative h-8 w-[calc(100%/7)]">
                <span
                  className={clsx(
                    "absolute top-1/2 left-1/2 -z-10 -translate-1/2",
                    day.isToday ? "text-red-400" : "text-gray-500",
                  )}
                >
                  {`${day.date}`.padStart(2, "0")}
                </span>

                {/* <span
                  className={clsx(
                    "inline-block size-2.5 rounded-full",
                    day.isToday ? "bg-red-400" : "bg-gray-300",
                  )}
                ></span> */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
