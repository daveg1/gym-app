import { memo } from "react";
import type { ISessionMap } from "../models/gym";

interface Props {
  sessionMap: ISessionMap;
  onStart(): void;
}

export const StartScreen = memo(({ sessionMap, onStart }: Readonly<Props>) => {
  return (
    <div className="grail-layout">
      <header className="grid h-24 place-items-center border-b border-b-gray-200 px-4">
        <h2 className="text-xl font-bold">Workout tracker</h2>
      </header>

      <main className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-semibold">Previous sessions</h2>

        <div className="flex flex-col">
          {Object.keys(sessionMap).map((sesh) => (
            <>{sesh}</>
          ))}
        </div>
      </main>

      <footer className="flex justify-center py-8">
        <button
          className="cursor-pointer rounded bg-gray-200/50 px-8 py-4 text-lg font-bold text-cyan-600"
          onClick={onStart}
        >
          Start session
        </button>
      </footer>
    </div>
  );
});
