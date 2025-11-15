import { ResumeIcon, AddIcon } from "../../../components/icons";
import { Header, NavButton } from "../../../components/ui";
import { TEMP_SESSION_KEY } from "../../../constants";

export function DashboardHeader() {
  const hasSession = !!localStorage.getItem(TEMP_SESSION_KEY);

  return (
    <Header
      text="Dashboard"
      rightSide={
        <NavButton to="/workout">
          {hasSession ? <ResumeIcon /> : <AddIcon />}
        </NavButton>
      }
    />
  );
}
