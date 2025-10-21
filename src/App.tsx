import { useTrackSession } from "./hooks";
import { ActiveSession, StartScreen } from "./screens";

function App() {
  const { isRunning, startSession, endSession, sets, addSet } =
    useTrackSession();

  return (
    <>
      <h2 className="text-3xl font-semibold">Session tracker</h2>

      {isRunning ? (
        <ActiveSession sets={sets} onTrack={addSet} onEnd={endSession} />
      ) : (
        <StartScreen onStart={startSession} />
      )}
    </>
  );
}

export default App;
