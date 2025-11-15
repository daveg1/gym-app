import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  border?: boolean;
  hasPadding?: boolean;
};

export function Footer({
  children,
  border,
  hasPadding,
  ...props
}: Readonly<Props>) {
  return (
    <footer
      className={clsx(
        "flex flex-col gap-2",
        hasPadding ? "px-4 pb-6" : "",
        border && "border-t border-gray-200 pt-4",
        props.className,
      )}
    >
      {children}
    </footer>
  );
}
