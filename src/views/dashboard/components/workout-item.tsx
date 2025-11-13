import { NavLink } from "react-router";
import type { IWorkout } from "../../../models/gym";
import { formatDate } from "../../../utils";
import { memo } from "react";

interface Props {
  workout: IWorkout;
}

export const WorkoutItem = memo(({ workout }: Readonly<Props>) => {
  // TODO: use <Card /> here
  return (
    <NavLink
      className="z-10 flex w-full touch-auto items-center gap-2 rounded-lg bg-gray-100 p-4 text-lg"
      to={"/details/" + workout.id}
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold">{workout.name ?? "Workout"}</h2>
        <p>{formatDate(workout.timestamp)}</p>
        <p>
          {workout.exercises.length} exercise
          {workout.exercises.length === 1 ? "" : "s"}
        </p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 size-6"
      >
        <path
          fillRule="evenodd"
          d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
          clipRule="evenodd"
        />
      </svg>
    </NavLink>
  );
});
