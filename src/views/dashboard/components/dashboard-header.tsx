import { PlayIcon, PlusIcon } from "../../../components/icons";
import { Header, NavButton } from "../../../components/ui";
import { WORKOUT_SESSION_KEY } from "../../../constants";

export function DashboardHeader() {
  const hasSession = !!localStorage.getItem(WORKOUT_SESSION_KEY);

  return (
    <Header
      text="Your workouts"
      rightSide={
        <NavButton to="/workout">
          {hasSession ? <PlayIcon /> : <PlusIcon />}
        </NavButton>
      }
    />
  );
}
