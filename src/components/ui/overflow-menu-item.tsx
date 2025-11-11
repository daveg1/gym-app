type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  icon?: React.ReactElement;
};

export function OverflowMenuItem({ text, icon, ...props }: Props) {
  return (
    <button
      className="flex h-16 w-48 items-center justify-between border-gray-300 pr-4 pl-8 text-left text-lg font-semibold text-gray-900 not-last-of-type:border-b"
      {...props}
    >
      {text}

      {icon}
    </button>
  );
}
