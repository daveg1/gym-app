import { useLocation } from "react-router";
import { useWorkoutStore } from "../../hooks";
import { useMemo, useState } from "react";
import { Text, NavButton, Footer, Page } from "../../components/ui";
import { DetailsHeader } from "./components/details-header";
import { DetailsList } from "./components/details-list";

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

      <Footer border className="gap-4">
        <Text>Total weight: {totalKg.toLocaleString()} kg</Text>

        <NavButton to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="mt-0.5 size-5"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
          Go back
        </NavButton>
      </Footer>
    </Page>
  );
}
