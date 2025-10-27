import { memo } from "react";

interface PropsStart {
  onStart(): void;
}

export const StartScreen = memo((opts: PropsStart) => {
  return (
    <>
      <header className="grid h-24 place-items-center border-b border-b-gray-200 px-4">
        <h2 className="text-xl font-bold">Workout tracker</h2>
      </header>

      <main className="grid h-full place-items-center py-4">
        <button
          className="mb-32 cursor-pointer rounded bg-gray-200/50 px-8 py-4 text-lg font-bold text-cyan-600"
          onClick={opts.onStart}
        >
          Start session
        </button>
      </main>
    </>
  );
});
