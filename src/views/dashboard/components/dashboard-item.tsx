import { useNavigate } from "react-router";
import type { IWorkout } from "../../../models/gym";
import { formatDate } from "../../../utils";
import { memo } from "react";
import { Card } from "../../../components/ui";
import { ForwardIcon } from "../../../components/icons";

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
      rightContent={<ForwardIcon />}
      onCardClick={() => navigate(`/details/${workout.id}`)}
    />
  );
});
