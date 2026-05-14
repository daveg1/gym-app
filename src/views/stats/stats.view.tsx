import { Page, Footer, Header, List, Card, Text } from "../../components/ui";
import { NavBar } from "../../components/shared";
import { useExerciseStore, useWorkoutStore } from "../../hooks";
import {
  muscleGroupValues,
  type IExercise,
  type IExerciseMap,
  type IWorkoutMap,
} from "../../models";
import { useNavigate } from "react-router";
import { ForwardIcon } from "../../components/icons";
import { memo, useMemo, useState } from "react";
import { MuscleGraph } from "../../components/shared/muscle-graph";
import { SectionCard } from "../../components/ui/section-card";

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

  return Object.fromEntries(
    muscleGroupValues
      .filter((group) => muscleGroups[group])
      .map((group) => [group, muscleGroups[group]]),
  );
}

export function StatsView() {
  const { workoutMap } = useWorkoutStore();
  const { exerciseMap } = useExerciseStore();

  const muscleGroups = useMemo(
    () => groupAndSort(workoutMap, exerciseMap),
    [workoutMap, exerciseMap],
  );

  const sortedExercises = (exercises: ExerciseGroups) =>
    Object.values(exercises).sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
    );

  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  function handleMuscleClick(muscle: string) {
    setSelectedMuscle(muscle);
  }

  return (
    <Page>
      <Header text="Stats" />

      <List>
        <MuscleGraph onMuscleClick={handleMuscleClick} />

        {selectedMuscle && (
          <SectionCard title={selectedMuscle}>
            <div>Go to exercises </div>
          </SectionCard>
        )}

        {!selectedMuscle && (
          <SectionCard title="No muscle selected">
            <div>Tap on the model to view a muscle</div>
          </SectionCard>
        )}
      </List>

      {/* <List hasFade>
        {Object.keys(muscleGroups).length ? (
          Object.entries(muscleGroups).map(([muscle, exercises]) => (
            <Card
              key={muscle}
              title={muscle}
              isCollapsible
              defaultOpen={false}
              mainContent={sortedExercises(exercises).map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            />
          ))
        ) : (
          <Text>No exercises logged yet.</Text>
        )}
      </List> */}

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}

const ExerciseCard = memo(({ exercise }: { exercise: ExerciseGroups[0] }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="bg-gray-200/75"
      key={exercise.id}
      title={exercise.name}
      mainContent={
        <div className="flex flex-col">
          <Text>
            {exercise.count} {exercise.count === 1 ? "entry" : "entries"}
          </Text>
        </div>
      }
      rightContent={<ForwardIcon />}
      onCardClick={() => navigate(`/stats/${exercise.id}`)}
    />
  );
});
