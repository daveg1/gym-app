import { useTrackSession } from "./hooks";
import { ActiveSession, StartScreen } from "./screens";

function App() {
  const { isRunning, startSession, endSession, sets, addSet } =
    useTrackSession();

  return (
    <div className="mx-auto max-w-2xl">
      {isRunning ? (
        <ActiveSession sets={sets} onTrack={addSet} onEnd={endSession} />
      ) : (
        <StartScreen onStart={startSession} />
      )}
    </div>
  );
}

export default App;
