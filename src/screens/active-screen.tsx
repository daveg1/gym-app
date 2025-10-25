import { memo } from "react";
import { Exercise } from "../components/exercise";
import { ExerciseForm } from "../components/exercise-form";
import { useSessionContext } from "../context";

// interface Props {
// onTrack(set: ISet): void;
// onEnd(): void;
// }

export const ActiveSession = memo(() => {
  const { exercises, addExercise } = useSessionContext();

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

        <ExerciseForm onSubmit={addExercise} />
      </div>
    </>
  );
});
