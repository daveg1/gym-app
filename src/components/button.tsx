type Props = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ text, ...props }: Readonly<Props>) {
  return (
    <button
      className="rounded-lg bg-gray-200/50 p-4 text-lg font-semibold text-cyan-600"
      {...props}
    >
      {text}
    </button>
  );
}
