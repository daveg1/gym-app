import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  icon?: React.ReactElement;
  mode?: "danger";
};

export function OverflowMenuItem({ text, icon, mode, ...props }: Props) {
  return (
    <button
      className={clsx(
        "flex h-14 w-52 items-center justify-between border-gray-300 pr-4 pl-6 text-left text-lg font-semibold text-gray-900 select-none not-last-of-type:border-b",
        mode === "danger"
          ? "text-red-400 active:bg-red-50"
          : "active:bg-gray-100",
      )}
      {...props}
    >
      {text}

      {icon}
    </button>
  );
}
