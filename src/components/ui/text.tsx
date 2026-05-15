import clsx from "clsx";
import type { PropsWithChildren } from "react";

interface Props {
  size?: "s" | "m";
  bold?: boolean;
  pre?: boolean;
  selectable?: boolean;
}

export function Text({
  size,
  pre,
  selectable,
  bold,
  children,
}: PropsWithChildren<Props>) {
  return (
    <p
      className={clsx(
        size === "s" && "text-sm font-semibold text-gray-500",
        !size || (size === "m" && "text-lg"),
        pre && "whitespace-pre-wrap",
        selectable && "select-text",
        bold && "font-semibold",
      )}
    >
      {children}
    </p>
  );
}
