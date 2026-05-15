import {
  Page,
  Footer,
  Header,
  List,
  Card,
  Text,
  SplitPanel,
} from "../../components/ui";
import {
  MuscleGraph,
  NavBar,
  type MuscleGraphProps,
} from "../../components/shared";
import {
  useCreateSessionStore,
  useExerciseStore,
  useWorkoutStore,
} from "../../hooks";
import {
  muscleGroupValues,
  type IExercise,
  type IExerciseMap,
  type IWorkoutMap,
} from "../../models";
import { useNavigate } from "react-router";
import { ForwardIcon } from "../../components/icons";
import { memo, useMemo, useState } from "react";
import { STATS_STORE_KEY } from "../../constants";

type MuscleGroupings = Record<string, ExerciseGroups>;
type ExerciseGroups = Record<string, IExercise & { count: number }>;

interface StatsSession {
  muscleView: MuscleGraphProps["view"];
}

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
  const { getSession, setSession } =
    useCreateSessionStore<StatsSession>(STATS_STORE_KEY);
  const { workoutMap } = useWorkoutStore();
  const { exerciseMap } = useExerciseStore();

  const [isSplitOpen, setIsSplitOpen] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [muscleView, setMuscleView] = useState(
    getSession("muscleView") ?? "front",
  );

  const smallView: MuscleGraphProps["view"] =
    muscleView === "front" ? "back" : "front";

  const muscleGroups = useMemo(
    () => groupAndSort(workoutMap, exerciseMap),
    [workoutMap, exerciseMap],
  );

  const sortedExercises = (exercises: ExerciseGroups) =>
    Object.values(exercises).sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
    );

  function handleMuscleSelect(muscle: string) {
    setIsSplitOpen(false);
    setSelectedMuscle(muscle);
  }

  return (
    <Page>
      <Header text="Stats" />

      <List>
        <MuscleGraph
          isEnabled
          view={muscleView}
          onMuscleSelect={handleMuscleSelect}
        />

        <div className="absolute right-4 w-[100px]">
          <MuscleGraph
            isEnabled={false}
            view={smallView}
            onMuscleSelect={handleMuscleSelect}
            onClick={() => {
              setMuscleView(smallView);
              setSession("muscleView", smallView);
            }}
          />
        </div>

        {selectedMuscle && (
          <Card
            title={selectedMuscle}
            mainContent={<div>View exercises</div>}
            rightContent={<ForwardIcon />}
            onCardClick={() => setIsSplitOpen((v) => !v)}
          />
        )}

        {!selectedMuscle && (
          <Card
            title="No muscle selected"
            mainContent={<div>Tap on the model to view a muscle</div>}
          />
        )}
      </List>

      {isSplitOpen && selectedMuscle && (
        <SplitPanel
          title={selectedMuscle}
          mainContent={
            <>
              {!muscleGroups[selectedMuscle] && (
                <div className="px-6">No exercises yet</div>
              )}
              {muscleGroups[selectedMuscle] && (
                <List hasFade>
                  {sortedExercises(muscleGroups[selectedMuscle]).map(
                    (exercise) => (
                      <ExerciseCard key={exercise.id} exercise={exercise} />
                    ),
                  )}
                </List>
              )}
            </>
          }
          isOpen={isSplitOpen}
          onClose={() => setIsSplitOpen(false)}
        />
      )}

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
