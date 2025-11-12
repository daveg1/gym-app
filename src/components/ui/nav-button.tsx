import { NavLink, type NavLinkProps } from "react-router";

type Props = {
  to: string;
  children?: React.ReactNode;
} & NavLinkProps;

export function NavButton({ children, ...props }: Readonly<Props>) {
  return (
    <NavLink
      className="flex justify-center rounded-lg bg-gray-200/50 p-4 text-lg font-semibold text-cyan-600"
      {...props}
    >
      {children}
    </NavLink>
  );
}
