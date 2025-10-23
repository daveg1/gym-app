import { memo, useRef } from "react";
import { MuscleGroupValues, type ISet } from "../models/gym";

interface Props {
  onSubmit(set: ISet): void;
}

export const SetForm = memo(({ onSubmit }: Readonly<Props>) => {
  const formRef = useRef<HTMLFormElement>(null!);

  function handleTrack() {
    const data = new FormData(formRef.current);

    for (const value of data.values()) {
      if (!value) return;
    }

    const newSet: ISet = {
      reps: parseInt(data.get("reps") as string) || 0,
      weight: parseFloat(data.get("weight") as string) || 0,
      target: data.get("target") as ISet["target"],
      timestamp: Date.now(),
      exercise: "Bench press",
      setNo: -1,
    };

    onSubmit(newSet);
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-3 gap-2"
      >
        <div></div>

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

      <button
        className="bg-gray-100 py-2 text-lg font-semibold text-gray-800"
        onClick={() => handleTrack()}
      >
        Add set
      </button>
    </>
  );
});
