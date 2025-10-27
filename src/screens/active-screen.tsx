import { memo } from "react";
import { Exercise } from "../components/exercise";
import { ExerciseForm } from "../components/exercise-form";
import { useSessionContext } from "../context";

interface Props {
  onEnd(): void;
}

export const ActiveSession = memo(({ onEnd }: Readonly<Props>) => {
  const { exercises, addExercise } = useSessionContext();

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-b-gray-200 px-4">
        <h2 className="text-xl font-bold">Workout</h2>

        <button
          className="cursor-pointer rounded bg-gray-200/50 px-4 py-2 font-semibold text-cyan-600"
          onClick={onEnd}
        >
          Finish
        </button>
      </header>

      <div className="flex flex-col gap-8 py-4">
        {exercises.map((ex) => (
          <Exercise key={ex.name} data={ex} />
        ))}

        <ExerciseForm onSubmit={addExercise} />
      </div>
    </>
  );
});
