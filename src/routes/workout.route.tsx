import { useCurrentSession, useStorage } from "../hooks";
import { Exercise } from "../components/shared";
import { Header, List, Text, Button, Footer, Page } from "../components/ui";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { IExercise, ISet } from "../models/gym";

export function WorkoutRoute() {
  const { sessionId, exercises, addExercise, updateExercise } =
    useCurrentSession();
  const { saveWorkout } = useStorage();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const date = new Date();
  const hours = date.getHours();
  const timeOfDay =
    hours < 12 ? "Morning" : hours < 17 ? "Afternoon" : "Evening";

  // todo: store session in local storage until we finish or cancel
  // todo: then reload it on any page refreshes.
  // const tempState = {};

  const onAddSet = (newSet: ISet, exercise: IExercise) => {
    exercise.sets.push(newSet);
    updateExercise(exercise);
  };

  const onAddExercise = () => {
    const name = prompt("Enter an exercise");
    if (!name) return;
    addExercise({ id: crypto.randomUUID(), name, sets: [] });
  };

  const onCancel = () => {
    if (confirm("Cancel workout? Your session will be discarded")) {
      navigate("/");
    }
  };

  const onFinish = () => {
    if (isEditing) {
      return alert("Notice: Please finish editing first");
    }

    if (exercises.some((ex) => !ex.sets.length)) {
      return alert(
        "Notice: some of your exercises are empty - please add sets or remove them",
      );
    }

    if (confirm("Finish workout? This session will be saved")) {
      saveWorkout({ id: sessionId, exercises, timestamp: +date });
      navigate("/");
    }
  };

  const handleEditExercise = (
    id: IExercise["id"],
    changes: Partial<IExercise>,
  ) => {
    updateExercise({ ...changes, id });
  };

  const handleEditSet = (
    id: IExercise["id"],
    setNo: number,
    changes: Partial<ISet>,
  ) => {
    const exerciseIndex = exercises.findIndex((ex) => ex.id === id);
    Object.assign(exercises[exerciseIndex].sets[setNo], changes);
    updateExercise(exercises[exerciseIndex]);
  };

  // TODO: add delete button for sets during workout

  return (
    <Page>
      <Header
        text={timeOfDay + " workout"}
        rightSide={
          !!exercises.length && (
            <Button icon onClick={() => setIsEditing((v) => !v)}>
              {isEditing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              )}
            </Button>
          )
        }
      />

      <List>
        {exercises.length ? (
          exercises.map((exercise, index) => (
            <Exercise
              key={index}
              data={exercise}
              onAddSet={(newSet) => onAddSet(newSet, exercise)}
              defaultOpen={true}
              isEditing={isEditing}
              onEditExercise={handleEditExercise}
              onEditSet={handleEditSet}
            />
          ))
        ) : (
          <Text>No exercises yet, go add one</Text>
        )}
      </List>

      <Footer>
        <Button text="Add exercise" onClick={() => onAddExercise()} />

        <div className="grid grid-cols-2 gap-[inherit]">
          <Button mode="danger" text="Cancel" onClick={() => onCancel()} />
          <Button mode="primary" text="Finish" onClick={() => onFinish()} />
        </div>
      </Footer>
    </Page>
  );
}
