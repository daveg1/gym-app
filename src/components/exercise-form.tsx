import { memo, useMemo, useRef } from "react";
import type { IExercise } from "../models/gym";

interface Props {
  onSubmit(set: IExercise): void;
}

export const ExerciseForm = memo(({ onSubmit }: Readonly<Props>) => {
  const formRef = useRef<HTMLFormElement>(null!);
  const inputName = useMemo(() => "exercise-name", []);

  function handleTrack() {
    const data = new FormData(formRef.current);

    if (!data.get(inputName)) return;

    const newExercise: IExercise = {
      name: data.get(inputName) as string,
      sets: [],
    };

    onSubmit(newExercise);
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}
        className="grid w-full grid-cols-2 gap-2 px-4"
      >
        <input
          className="h-12 rounded bg-gray-200 px-2 placeholder:opacity-50"
          type="text"
          name={inputName}
          placeholder="Bench press"
          required
        />

        <button
          className="bg-gray-100 py-2 font-semibold text-gray-800"
          onClick={() => handleTrack()}
        >
          Add exercise
        </button>
      </form>
    </>
  );
});
