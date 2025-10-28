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
    <div className="active-layout h-full">
      <header className="flex h-24 items-center justify-between border-b border-b-gray-200 px-4">
        <h2 className="text-xl font-bold">Tonight's session</h2>

        <button
          className="cursor-pointer rounded bg-gray-200/50 px-4 py-2 font-semibold text-cyan-600"
          onClick={onEnd}
        >
          Finish
        </button>
      </header>

      <main className="flex h-full flex-col overflow-y-scroll">
        {exercises.map((ex) => (
          <Exercise key={ex.name} data={ex} />
        ))}
      </main>

      <footer className="p-4">
        <ExerciseForm onSubmit={addExercise} />
      </footer>
    </div>
  );
});
