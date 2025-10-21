import { memo } from "react";
import { Button } from "../components";

interface PropsStart {
  onStart(): void;
}

export const StartScreen = memo((opts: PropsStart) => {
  return <Button onClick={opts.onStart}>Start session</Button>;
});
