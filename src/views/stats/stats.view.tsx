import { Page, Footer, Header, List, Card, Text } from "../../components/ui";
import { NavBar } from "../../components/shared";
import { useWorkoutStore } from "../../hooks";
import { useMemo } from "react";
import type { IExercise } from "../../models/gym";
import { useNavigate } from "react-router";

const findHighest = (exercises: IExercise[]) => {
  let highest = -1;
  let highestSetNo = 0;
  let highestRef: IExercise = exercises[0];

  for (const exercise of exercises) {
    for (let i = 0; i < exercise.sets.length; i++) {
      if (exercise.sets[i].weight > highest) {
        highest = exercise.sets[i].weight;
        highestRef = exercise;
        highestSetNo = i;
      }
    }
  }

  return highestRef.sets[highestSetNo];
};

export function StatsView() {
  const navigate = useNavigate();
  const { workoutMap } = useWorkoutStore();
  // Aggregate stats
  const exercisesByGroup = useMemo(() => {
    const groups = new Map<string, IExercise[]>();

    Object.values(workoutMap).forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (!groups.has(exercise.name)) {
          groups.set(exercise.name, [exercise]);
        } else {
          const current = groups.get(exercise.name)!;
          groups.set(exercise.name, [...current, exercise]);
        }
      });
    });

    return groups;
  }, [workoutMap]);

  return (
    <Page>
      <Header text="Stats" />

      <List>
        {[...exercisesByGroup].map(([name, exercises]) => (
          <Card
            key={name}
            title={name}
            mainContent={
              <div className="flex flex-col">
                <Text>
                  Done {exercises.length} time
                  {exercises.length === 1 ? "" : "s"}
                </Text>
                <Text>Highest weight: {findHighest(exercises).weight} kg</Text>
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
            onCardClick={() => navigate(`/stats/${name}`)}
          />
        ))}
      </List>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
