import { memo, useRef } from "react";
import { MuscleGroupValues, type GymSet } from "../models/gym";
import { Button, SetList } from "../components";

interface PropsActive {
  sets: GymSet[];
  onTrack(set: GymSet): void;
  onEnd(): void;
}

export const ActiveSession = memo((opts: PropsActive) => {
  const formRef = useRef<HTMLFormElement>(null!);

  function handleTrack() {
    const data = new FormData(formRef.current);

    for (const value of data.values()) {
      if (!value) return;
    }

    const newSet: GymSet = {
      reps: parseInt(data.get("reps") as string) || 0,
      weightKg: parseFloat(data.get("weight") as string) || 0,
      target: data.get("target") as GymSet["target"],
      timestamp: Date.now(),
    };

    opts.onTrack(newSet);
  }

  return (
    <div className="flex flex-col gap-4">
      <menu className="flex gap-2 p-2">
        <Button onClick={() => handleTrack()}>Add set</Button>
        <Button className="ml-auto" onClick={opts.onEnd}>
          End session
        </Button>
      </menu>

      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-3 gap-2"
      >
        <select name="target" className="h-8 rounded border px-1" required>
          {MuscleGroupValues.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <input
          className="h-8 rounded border px-1"
          name="reps"
          type="number"
          min="0"
          max="30"
          defaultValue="0"
          required
        />
        <input
          className="h-8 rounded border px-1"
          name="weight"
          type="number"
          min="0"
          max="255"
          defaultValue="0"
          required
        />
      </form>

      <SetList sets={opts.sets} />
    </div>
  );
});
