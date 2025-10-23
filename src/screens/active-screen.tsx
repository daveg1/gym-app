import { memo } from "react";
import { type ISet } from "../models/gym";
import { Exercise } from "../components/exercise";

interface Props {
  sets: ISet[];
  onTrack(set: ISet): void;
  onEnd(): void;
}

export const ActiveSession = memo((props: Readonly<Props>) => {
  return (
    <>
      <header className="flex h-16 items-center justify-between px-4">
        <h2 className="text-xl font-bold">Workout</h2>

        <button className="font-semibold text-cyan-600" onClick={props.onEnd}>
          Finish
        </button>
      </header>

      <Exercise />

      <button>Add exercise</button>
    </>
  );
});
