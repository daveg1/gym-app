import { useNavigate } from "react-router";
import type { IWorkout } from "../../../models/gym";
import { formatDate } from "../../../utils";
import { memo } from "react";
import { Card } from "../../../components/ui";

interface Props {
  workout: IWorkout;
}

export const DashboardItem = memo(({ workout }: Readonly<Props>) => {
  const navigate = useNavigate();

  return (
    <Card
      title={workout.name ?? "Workout"}
      mainContent={
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>{formatDate(workout.timestamp)}</p>
            <p>
              {workout.exercises.length} exercise
              {workout.exercises.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      }
      rightContent={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
            clipRule="evenodd"
          />
        </svg>
      }
      onCardClick={() => navigate(`/details/${workout.id}`)}
    />
  );
});
