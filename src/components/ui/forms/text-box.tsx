import { Text } from "../text";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?: "text" | "number";
};

export function TextBox({ label, type, ...props }: Props) {
  return (
    <label className="flex flex-col gap-2">
      {label && <Text size="s">{label}</Text>}
      <input
        {...props}
        type={type ?? "text"}
        className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400 disabled:opacity-50"
      />
    </label>
  );
}
