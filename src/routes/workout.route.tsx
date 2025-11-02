import { useCurrentSession } from "../hooks";
import { Exercise } from "../components/exercise";
import { useStorage } from "../hooks/use-storage";
import { useNavigate } from "react-router";
import { useCallback } from "react";
import { Header } from "../components/header";
import type { IExercise, ISet } from "../models/gym";
import { List } from "../components/list";
import { Text } from "../components/text";
import { Button } from "../components/button";

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

  const onAddExercise = useCallback(() => {
    const name = prompt("Enter an exercise");
    if (!name) return;
    addExercise({ name, sets: [] });
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
        <Button text="Add exercise" onClick={() => onAddExercise()} />
        <Button text="Finish" onClick={() => onFinish()} />
      </footer>
    </section>
  );
}
