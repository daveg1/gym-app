import clsx from "clsx";

export function Button({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?(): void;
}) {
  return (
    <button
      className={clsx(
        "h-8 cursor-pointer rounded bg-stone-400 px-2 text-sm font-semibold",
        className,
      )}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}
