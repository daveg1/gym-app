import { Page, Footer, Header, List, Card, Text } from "../../components/ui";
import { NavBar } from "../../components/shared";
import { useWorkoutStore } from "../../hooks";
import { useMemo } from "react";
import type { IExercise } from "../../models/gym";
import { useNavigate } from "react-router";
import { ForwardIcon } from "../../components/icons";

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
  const exerciseGroups = useMemo(() => {
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

  const sortedGroups = [...exerciseGroups].sort(([a], [b]) => (a > b ? 1 : -1));

  // TODO: group by muscle group

  return (
    <Page>
      <Header text="Stats" caption="By muscle group" />

      <List>
        {sortedGroups.map(([name, exercises]) => (
          <Card
            key={name}
            title={name}
            mainContent={
              <div className="flex flex-col">
                <Text>
                  Done {exercises.length} time
                  {exercises.length === 1 ? "" : "s"}
                </Text>
                <Text>Heaviest weight: {findHighest(exercises).weight} kg</Text>
              </div>
            }
            rightContent={<ForwardIcon />}
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
