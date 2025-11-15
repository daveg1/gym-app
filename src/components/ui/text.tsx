import clsx from "clsx";

interface Props {
  size?: "s" | "m";
  pre?: boolean;
  selectable?: boolean;
  children: React.ReactNode;
}

export function Text({ size, pre, selectable, children }: Props) {
  return (
    <p
      className={clsx(
        size === "s" && "text-sm font-semibold text-gray-500",
        !size || (size === "m" && "text-lg"),
        pre && "whitespace-pre-wrap",
        selectable && "select-text",
      )}
    >
      {children}
    </p>
  );
}
