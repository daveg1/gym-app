import { useTrackSession } from "./hooks";
import { ActiveSession, StartScreen } from "./screens";

function App() {
  const { isRunning, startSession } = useTrackSession();

  return (
    <div className="mx-auto max-w-2xl">
      {isRunning ? <ActiveSession /> : <StartScreen onStart={startSession} />}
    </div>
  );
}

export default App;
