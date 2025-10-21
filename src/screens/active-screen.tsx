import { memo } from "react";
import { type ISet } from "../models/gym";
import { Button, SetList } from "../components";
import { SetForm } from "../components/set-form";

interface Props {
  sets: ISet[];
  onTrack(set: ISet): void;
  onEnd(): void;
}

export const ActiveSession = memo((props: Readonly<Props>) => {
  return (
    <div className="flex flex-col gap-4">
      <SetList sets={props.sets} />

      <SetForm onSubmit={props.onTrack} />

      <Button className="ml-auto" onClick={props.onEnd}>
        End session
      </Button>
    </div>
  );
});
