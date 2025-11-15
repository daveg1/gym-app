import { memo, useRef } from "react";
import type { ISet } from "../../models/gym";
import { AddIcon } from "../icons";
import { TextBox } from "../ui";

interface Props {
  setNo: number;
  onSubmit(set: ISet): void;
}

export const SetForm = memo(({ setNo, onSubmit }: Readonly<Props>) => {
  const formRef = useRef<HTMLFormElement>(null!);

  function handleTrack() {
    const data = new FormData(formRef.current);

    for (const value of data.values()) {
      if (!value) return;
    }

    const newSet: ISet = {
      reps: parseInt(data.get("reps") as string) || 0,
      weight: parseFloat(data.get("weight") as string) || 0,
    };

    onSubmit(newSet);
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-3 gap-2"
      >
        <p className="leading-10">{setNo}</p>

        <TextBox name="reps" type="number" min={0} defaultValue={6} required />

        <TextBox
          name="weight"
          type="number"
          min={0}
          defaultValue={10}
          required
        />
      </form>

      <button
        className="flex justify-center rounded bg-gray-300 py-2 font-semibold text-gray-700 active:bg-amber-200"
        onClick={() => handleTrack()}
      >
        <AddIcon size="l" />
      </button>
    </div>
  );
});
