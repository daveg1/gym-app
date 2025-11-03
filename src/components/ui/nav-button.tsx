import { NavLink, type NavLinkProps } from "react-router";

type Props = {
  to: string;
  text: string;
} & NavLinkProps;

export function NavButton({ text, ...props }: Readonly<Props>) {
  return (
    <NavLink
      className="rounded-lg bg-gray-200/50 p-4 text-center text-lg font-semibold text-cyan-600"
      {...props}
    >
      {text}
    </NavLink>
  );
}
