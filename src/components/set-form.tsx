import { memo, useRef } from "react";
import type { ISet } from "../models/gym";

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
        <span>{setNo}</span>
        <input
          className="rounded bg-gray-200 px-1"
          type="number"
          name="reps"
          min={0}
          defaultValue={1}
          required
        />
        <input
          className="rounded bg-gray-200 px-1"
          type="number"
          name="weight"
          min={0}
          defaultValue={10}
          required
        />
      </form>

      <button
        className="flex justify-center bg-gray-100 py-2 font-semibold text-gray-800"
        onClick={() => handleTrack()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
});
