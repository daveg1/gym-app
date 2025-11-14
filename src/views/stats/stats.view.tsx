import { Page, Footer, Header, List, Card, Text } from "../../components/ui";
import { NavBar } from "../../components/shared";
import { useWorkoutStore } from "../../hooks";
import { useMemo } from "react";
import type { IExercise } from "../../models/gym";

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
          />
        ))}
      </List>

      <Footer noPadding>
        <NavBar />
      </Footer>
    </Page>
  );
}
