import { useTrackSession } from "./hooks";
import { ActiveSession, StartScreen } from "./screens";

function App() {
  const { isRunning, startSession, endSession } = useTrackSession();

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col">
      {isRunning ? (
        <ActiveSession onEnd={endSession} />
      ) : (
        <StartScreen onStart={startSession} />
      )}
    </div>
  );
}

export default App;
