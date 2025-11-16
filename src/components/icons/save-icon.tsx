import clsx from "clsx";
import type { IconProps } from "./icon-props";

export function SaveIcon({ size }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(
        size === "s" ? "size-4" : size === "l" ? "size-6" : "size-5",
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}
