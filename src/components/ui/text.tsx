import clsx from "clsx";

interface Props {
  size?: "s" | "m";
  children: React.ReactNode;
}

export function Text({ size, children }: Props) {
  return (
    <p
      className={clsx(
        size === "s" && "text-sm font-semibold text-gray-500",
        !size || (size === "m" && "text-lg"),
      )}
    >
      {children}
    </p>
  );
}
