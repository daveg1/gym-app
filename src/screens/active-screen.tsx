import { memo } from "react";
import type { GymSet } from "../models/gym";
import { Button, SetList } from "../components";

interface PropsActive {
  sets: GymSet[];
  onTrack(set: GymSet): void;
  onEnd(): void;
}

export const ActiveSession = memo((opts: PropsActive) => {
  return (
    <>
      <Button onClick={opts.onEnd}>End session</Button>

      <SetList sets={opts.sets} />
    </>
  );
});
