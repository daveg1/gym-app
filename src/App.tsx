import { useTrackSession } from "./hooks";
import { ActiveSession, StartScreen } from "./screens";

function App() {
  const { isRunning, startSession, endSession, sets, addSet } =
    useTrackSession();

  return (
    <div className="mx-auto max-w-2xl">
      <header className="bg-zinc-700 p-4 text-center">
        <h2 className="text-3xl font-semibold text-white">Session tracker</h2>
      </header>

      {isRunning ? (
        <ActiveSession sets={sets} onTrack={addSet} onEnd={endSession} />
      ) : (
        <StartScreen onStart={startSession} />
      )}
    </div>
  );
}

export default App;
