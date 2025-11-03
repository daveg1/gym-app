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
import { Footer } from "../components/footer";
import { Page } from "../components/page";

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

  const onCancel = useCallback(() => {
    if (confirm("Cancel workout? Your session will be discarded")) {
      navigate("/");
    }
  }, []);

  const onFinish = useCallback(() => {
    if (confirm("Finish workout? This session will be saved")) {
      saveData(sessionId, { id: sessionId, exercises, timestamp: +date });
      navigate("/");
    }
  }, []);

  return (
    <Page>
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

      <Footer>
        <Button text="Add exercise" onClick={() => onAddExercise()} />

        <div className="grid grid-cols-2 gap-2">
          <Button mode="danger" text="Cancel" onClick={() => onCancel()} />
          <Button mode="primary" text="Finish" onClick={() => onFinish()} />
        </div>
      </Footer>
    </Page>
  );
}
