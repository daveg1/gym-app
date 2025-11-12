import clsx from "clsx";
import { NavLink, type NavLinkProps } from "react-router";

type Props = {
  to: string;
  label?: string;
  icon?: React.ReactNode;
} & NavLinkProps;

export function NavButton({ label, icon, ...props }: Readonly<Props>) {
  return (
    <NavLink
      className={(link) =>
        clsx(
          "flex flex-col items-center rounded-lg bg-gray-200/50 px-4 py-2 text-lg font-semibold",
          link.isActive ? "text-cyan-600" : "text-gray-500",
        )
      }
      {...props}
    >
      {icon}
      {label && <span>{label}</span>}
    </NavLink>
  );
}
