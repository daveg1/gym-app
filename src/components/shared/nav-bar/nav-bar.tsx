import { HomeIcon, PlannerIcon, StatsIcon } from "../../icons";
import { NavBarItem } from "./nav-bar-item";

interface INavItem {
  to: string;
  label: string;
  icon: React.ReactElement;
}

export function NavBar() {
  const navItems: INavItem[] = [
    {
      to: "/",
      label: "Home",
      icon: <HomeIcon />,
    },
    {
      to: "/planner",
      label: "Planner",
      icon: <PlannerIcon />,
    },
    {
      to: "/stats",
      label: "Stats",
      icon: <StatsIcon />,
    },
  ];

  return (
    <nav className="flex w-full border-t border-t-gray-200">
      {navItems.map((item) => (
        <NavBarItem key={item.to} {...item} />
      ))}
    </nav>
  );
}
