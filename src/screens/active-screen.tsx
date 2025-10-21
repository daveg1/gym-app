import { memo } from "react";

interface PropsActive {
  onEnd(): void;
}

export const ActiveSession = memo((opts: PropsActive) => {
  return (
    <button
      className="h-8 cursor-pointer rounded bg-stone-400 px-2"
      onClick={() => opts.onEnd()}
    >
      End session
    </button>
  );
});
