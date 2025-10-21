import { useTrackSession } from "./hooks";
import { ActiveSession, StartScreen } from "./screens";

function App() {
  const { isRunning, startSession, endSession } = useTrackSession();

  return (
    <>
      <h2 className="text-3xl font-semibold">Session tracker</h2>

      {isRunning ? (
        <ActiveSession onEnd={endSession} />
      ) : (
        <StartScreen onStart={startSession} />
      )}
    </>
  );
}

export default App;
