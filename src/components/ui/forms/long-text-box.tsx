import { Text } from "../text";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function LongTextBox({ label, ...props }: Props) {
  return (
    <label className="flex flex-col gap-2">
      {label && <Text size="s">{label}</Text>}
      <textarea
        {...props}
        className="h-[calc(1lh*10)] rounded bg-gray-50 p-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400"
      ></textarea>
    </label>
  );
}
