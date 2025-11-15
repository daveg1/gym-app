import { memo, useRef } from "react";
import type { ISet } from "../../models/gym";
import { PlusIcon } from "../icons";

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

        <input
          className="h-full rounded bg-gray-200 px-2 outline outline-gray-600 focus:outline-4 focus:outline-amber-400"
          type="number"
          name="reps"
          min={0}
          defaultValue={1}
          required
        />

        <input
          className="h-full rounded bg-gray-200 px-2 outline outline-gray-600 focus:outline-4 focus:outline-amber-400"
          type="number"
          name="weight"
          min={0}
          defaultValue={10}
          required
        />
      </form>

      <button
        className="flex justify-center rounded bg-gray-300 py-2 font-semibold text-gray-700 active:bg-amber-200"
        onClick={() => handleTrack()}
      >
        {/* <svg
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
        </svg> */}

        <PlusIcon size="l" />
      </button>
    </div>
  );
});
