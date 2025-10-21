import { memo } from "react";

interface PropsStart {
  onStart(): void;
}

export const StartScreen = memo((opts: PropsStart) => {
  return (
    <button
      className="h-8 cursor-pointer rounded bg-stone-400 px-2"
      onClick={() => opts.onStart()}
    >
      Start session
    </button>
  );
});
