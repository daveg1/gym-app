import clsx from "clsx";
import { useMemo } from "react";
import type { IWorkout } from "../../models";
import {
  addDays,
  addMonths,
  format,
  getDaysInMonth,
  isSameDay,
  startOfDay,
  subMonths,
} from "date-fns";
import { Button } from "./button/button";
import { BackIcon, NextIcon, WeightIcon } from "../icons";
import { Text } from "./text";
import { useNavigate } from "react-router";

interface CalendarProps {
  date: number;
  workouts: IWorkout[];
  onChange(date: Date): void;
}

export function Calendar(props: CalendarProps) {
  const { workouts } = props;
  const navigate = useNavigate();

  const date = useMemo(() => new Date(props.date), [props.date]);
  const monthName = format(date, "MMMM");
  const yearName = format(date, "yyyy");

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
      const workout = workouts.find((w) => isSameDay(w.timestamp, cellDateObj));

      cells.push({
        date: cellDate < 1 ? prevMonthDays + cellDate : cellDate,
        workout,
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

  function moveMonth(direction: 1 | -1) {
    props.onChange(addMonths(date, direction));
  }

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <header className="flex justify-between">
        <Text bold size="m">
          {monthName}
        </Text>

        <Text bold size="m">
          {yearName}
        </Text>
      </header>

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
                <td
                  key={dIdx}
                  className="relative h-12 w-[calc(100%/7)]"
                  onClick={() =>
                    day.workout && navigate(`/details/${day.workout.id}`)
                  }
                >
                  <span
                    className={clsx(
                      "inline-grid size-8 place-items-center rounded-full",
                      day.workout
                        ? "bg-red-400 text-white"
                        : "outline outline-gray-200",
                    )}
                  >
                    {day.workout ? <WeightIcon /> : day.date}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <menu className="flex justify-between">
        <Button onClick={() => moveMonth(-1)}>
          <BackIcon />
        </Button>

        <Button onClick={() => moveMonth(1)}>
          <NextIcon />
        </Button>
      </menu>
    </div>
  );
}
