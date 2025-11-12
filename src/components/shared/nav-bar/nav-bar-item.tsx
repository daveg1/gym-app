import clsx from "clsx";
import { NavLink } from "react-router";

interface Props {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export function NavBarItem({ to, label, icon }: Props) {
  return (
    <NavLink
      to={to}
      className={(link) =>
        clsx(
          "flex w-full flex-col items-center py-2 text-lg font-semibold",
          link.isActive ? "text-cyan-600" : "text-gray-500",
        )
      }
    >
      {icon}
      {label && <span>{label}</span>}
    </NavLink>
  );
}
