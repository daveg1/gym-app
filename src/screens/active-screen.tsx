import { memo, useState } from "react";
import { Exercise } from "../components/exercise";
import { ExerciseForm } from "../components/exercise-form";

interface Props {
  sets: ISet[];
  onTrack(set: ISet): void;
  onEnd(): void;
}

export interface ISet {
  reps: number;
  weight: number;
}

export interface IExercise {
  name: string;
  sets: ISet[];
}

export const ActiveSession = memo((props: Readonly<Props>) => {
  const [exercises, setExercises] = useState<IExercise[]>([
    {
      name: "Bench press",
      sets: [
        {
          reps: 6,
          weight: 70,
        },
      ],
    },
  ]);

  return (
    <>
      <header className="flex h-16 items-center justify-between px-4">
        <h2 className="text-xl font-bold">Workout</h2>

        <button className="font-semibold text-cyan-600" onClick={props.onEnd}>
          Finish
        </button>
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
