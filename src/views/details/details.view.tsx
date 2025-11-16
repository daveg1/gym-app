import { useLocation } from "react-router";
import { useWorkoutStore } from "../../hooks";
import { useMemo, useState } from "react";
import { Text, Footer, Page } from "../../components/ui";
import { DetailsHeader } from "./components/details-header";
import { DetailsList } from "./components/details-list";
import { NavBar } from "../../components/shared";

export function DetailsView() {
  const { getById } = useWorkoutStore();
  const location = useLocation();
  const workoutId = useMemo(
    () => location.pathname.split("/details/")[1],
    [location.pathname],
  );
  const workout = getById(workoutId);
  const [isEditing, setIsEditing] = useState(false);

  // ! FIXME: redirect not working
  // useEffect(() => {
  //   if (!workout) navigate("/");
  // }, [workout]);

  if (!workout) return null;

  const totalKg = workout.exercises.reduce(
    (total, ex) =>
      total + ex.sets.reduce((kg, set) => kg + set.weight * set.reps, 0),
    0,
  );

  return (
    <Page>
      <DetailsHeader
        workoutId={workout.id}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <DetailsList workout={workout} isEditing={isEditing} />

      <Footer>
        <div className="px-6 py-2">
          <Text>Total weight: {totalKg.toLocaleString()} kg</Text>
        </div>

        <NavBar />
      </Footer>
    </Page>
  );
}
