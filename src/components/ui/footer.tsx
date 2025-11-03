import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  border?: boolean;
};

export function Footer({ children, border, ...props }: Readonly<Props>) {
  return (
    <footer
      className={clsx(
        "flex flex-col gap-2 px-6",
        border && "border-t border-gray-200 pt-4",
        props.className,
      )}
    >
      {children}
    </footer>
  );
}
