import { memo, useState } from "react";
import { Exercise } from "../components/exercise";
import { ExerciseForm } from "../components/exercise-form";
import type { IExercise } from "../models/gym";

interface Props {
  exercises: IExercise[];
  // onTrack(set: ISet): void;
  // onEnd(): void;
}

export const ActiveSession = memo((props: Readonly<Props>) => {
  const [exercises, setExercises] = useState<IExercise[]>(props.exercises);

  return (
    <>
      <header className="flex h-16 items-center justify-between px-4">
        <h2 className="text-xl font-bold">Workout</h2>

        {/* <button className="font-semibold text-cyan-600" onClick={props.onEnd}>
          Finish
        </button> */}
      </header>

      <div className="flex flex-col gap-8">
        {exercises.map((ex) => (
          <Exercise key={ex.name} data={ex} />
        ))}

        <ExerciseForm
          onSubmit={(newEx) => {
            setExercises((ex) => [...ex, newEx]);
          }}
        />
      </div>
    </>
  );
});
