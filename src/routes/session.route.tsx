import { NavLink } from "react-router";
import { useCurrentSession } from "../hooks";
import type { IExercise } from "../models/gym";
import { Exercise } from "../components/exercise";
import { SetForm } from "../components/set-form";
import { ExerciseForm } from "../components/exercise-form";

interface Props {
  onEnd(id: string, session: IExercise[]): void;
}

export function SessionRoute({ onEnd }: Readonly<Props>) {
  const { sessionId, exercises, addExercise } = useCurrentSession();

  // todo: store session in local storage until we finish or cancel
  // todo: then reload it on any page refreshes.
  // const tempState = {};

  const date = new Date();
  const hours = date.getHours();
  const timeOfDay =
    hours < 12 ? "This morning" : hours < 17 ? "Today" : "Tonight";

  return (
    <section className="flex h-full flex-col gap-4 py-6">
      <header className="flex items-center gap-2 px-6">
        <h2 className="text-3xl font-semibold">{timeOfDay}'s workout</h2>
      </header>

      <main className="h-full overflow-y-auto">
        {exercises.length ? (
          exercises.map((ex) => <Exercise key={ex.name} data={ex} />)
        ) : (
          <p className="text-lg">No exercises yet, go add one</p>
        )}
      </main>

      <footer className="flex flex-col gap-2 px-6">
        <ExerciseForm onSubmit={addExercise} />

        <button
          className="rounded-lg bg-gray-200/50 p-4 text-lg font-semibold text-cyan-600"
          onClick={() => onEnd(sessionId, exercises)}
        >
          Finish
        </button>
      </footer>
    </section>
  );
}
