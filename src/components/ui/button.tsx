import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  text?: string;
  mode?: "regular" | "danger" | "primary";
  icon?: boolean;
};

export function Button({
  text,
  mode,
  icon,
  className,
  ...props
}: Readonly<Props>) {
  return (
    <button
      className={clsx(
        "rounded-lg p-4 text-lg font-semibold",
        mode === "danger"
          ? "bg-red-200/50 text-red-600"
          : mode === "primary"
            ? "bg-sky-200/50 text-cyan-600"
            : "bg-gray-200/50 text-cyan-600",
        icon && "size-14",
        className,
      )}
      {...props}
    >
      {text ?? props.children}
    </button>
  );
}
