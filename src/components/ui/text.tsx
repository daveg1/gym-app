import clsx from "clsx";

interface Props {
  size?: "s" | "m";
  pre?: boolean;
  children: React.ReactNode;
}

export function Text({ size, pre, children }: Props) {
  return (
    <p
      className={clsx(
        size === "s" && "text-sm font-semibold text-gray-500",
        !size || (size === "m" && "text-lg"),
        pre && "whitespace-pre-wrap",
      )}
    >
      {children}
    </p>
  );
}
