import { NavLink } from "react-router";
import type { IWorkout } from "../../models/gym";
import { formatDate } from "../../utils";
import { memo } from "react";

interface Props {
  workout: IWorkout;
}

export const WorkoutItem = memo(({ workout }: Readonly<Props>) => {
  return (
    <NavLink
      className="rounded-lg bg-gray-100 p-4 text-lg"
      to={"/details/" + workout.id}
    >
      <h2 className="text-xl font-semibold">{formatDate(workout.timestamp)}</h2>
      <p>
        {workout.exercises.length} exercise
        {workout.exercises.length === 1 ? "" : "s"}
      </p>
    </NavLink>
  );
});
