import { useCurrentSession } from "../hooks";
import { Exercise } from "../components/exercise";
import { ExerciseForm } from "../components/exercise-form";
import { useStorage } from "../hooks/use-storage";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { Header } from "../components/header";
import type { IExercise, ISet } from "../models/gym";
import { List } from "../components/list";
import { Text } from "../components/text";

export function WorkoutRoute() {
  const { sessionId, exercises, addExercise, updateExercise } =
    useCurrentSession();
  const { saveData } = useStorage();
  let navigate = useNavigate();

  const date = new Date();
  const hours = date.getHours();
  const timeOfDay =
    hours < 12 ? "This morning" : hours < 17 ? "Today" : "Tonight";

  // todo: store session in local storage until we finish or cancel
  // todo: then reload it on any page refreshes.
  // const tempState = {};

  const onAddSet = useCallback((newSet: ISet, exercise: IExercise) => {
    exercise.sets.push(newSet);
    updateExercise(exercise);
  }, []);

  function onFinish() {
    if (confirm("Are you sure?")) {
      saveData(sessionId, { id: sessionId, exercises, timestamp: +date });
      navigate("/");
    }
  }

  return (
    <section className="flex h-full flex-col gap-4 py-6">
      <Header text={timeOfDay + "'s workout"} />

      <List>
        {exercises.length ? (
          exercises.map((exercise) => (
            <Exercise
              key={exercise.name}
              data={exercise}
              onAddSet={(newSet) => onAddSet(newSet, exercise)}
            />
          ))
        ) : (
          <Text>No exercises yet, go add one</Text>
        )}
      </List>

      <footer className="flex flex-col gap-2 px-6">
        <ExerciseForm onSubmit={addExercise} />

        <button
          className="rounded-lg bg-gray-200/50 p-4 text-lg font-semibold text-cyan-600"
          onClick={() => onFinish()}
        >
          Finish
        </button>
      </footer>
    </section>
  );
}
