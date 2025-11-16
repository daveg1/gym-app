import { Page, Footer, Header, List, Card, Text } from "../../components/ui";
import { NavBar } from "../../components/shared";
import { useExerciseStore, useWorkoutStore } from "../../hooks";
import type { IExercise, IExerciseMap, IWorkoutMap } from "../../models";
import { useNavigate } from "react-router";
import { ForwardIcon } from "../../components/icons";

// const findHighest = (exercises: IWorkoutExercise[]) => {
//   let highest = -1;
//   let highestSetNo = 0;
//   let highestRef: IWorkoutExercise = exercises[0];

//   for (const exercise of exercises) {
//     for (let i = 0; i < exercise.sets.length; i++) {
//       if (exercise.sets[i].weight > highest) {
//         highest = exercise.sets[i].weight;
//         highestRef = exercise;
//         highestSetNo = i;
//       }
//     }
//   }

//   return highestRef.sets[highestSetNo];
// };

type MuscleGroupings = Record<string, ExerciseGroups>;
type ExerciseGroups = Record<string, IExercise & { count: number }>;

function groupAndSort(workoutMap: IWorkoutMap, exerciseMap: IExerciseMap) {
  const muscleGroups: MuscleGroupings = {};

  // map exercise objects
  const exercises = Object.values(workoutMap).flatMap((workout) =>
    workout.exercises.map((ex) => exerciseMap[ex.id]),
  );

  exercises.forEach((exercise) => {
    if (!muscleGroups[exercise.muscleGroup]) {
      muscleGroups[exercise.muscleGroup] = {};
    }

    if (!muscleGroups[exercise.muscleGroup][exercise.id]) {
      muscleGroups[exercise.muscleGroup][exercise.id] = {
        ...exercise,
        count: 0,
      };
    }

    muscleGroups[exercise.muscleGroup][exercise.id].count++;
  });

  return muscleGroups;
}

export function StatsView() {
  const navigate = useNavigate();
  const { workoutMap } = useWorkoutStore();
  const { exerciseMap } = useExerciseStore();

  const muscleGroups = groupAndSort(workoutMap, exerciseMap);

  return (
    <Page>
      <Header text="Stats" />

      <List hasFade>
        {Object.keys(muscleGroups).length ? (
          Object.entries(muscleGroups).map(([muscle, exercises]) => (
            <section key={muscle} className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{muscle}</h2>

              {Object.values(exercises)
                .sort((a, b) =>
                  a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
                )
                .map((exercise) => (
                  <Card
                    key={exercise.id}
                    title={exercise.name}
                    mainContent={
                      <div className="flex flex-col">
                        <Text>
                          Done {exercise.count} time
                          {exercise.count === 1 ? "" : "s"}
                        </Text>
                        {/* <Text>
                    Heaviest weight: {findHighest(exercises).weight} kg
                  </Text> */}
                      </div>
                    }
                    rightContent={<ForwardIcon />}
                    onCardClick={() => navigate(`/stats/${name}`)}
                  />
                ))}
            </section>
          ))
        ) : (
          <Text>No exercises logged yet.</Text>
        )}
      </List>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
