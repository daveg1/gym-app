import { Text } from "../text";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  data: { value: string; label: string }[];
};

export function SelectBox({ label, data, ...props }: Props) {
  return (
    <label className="flex flex-col gap-2">
      {label && <Text size="s">{label}</Text>}
      <select
        {...props}
        className="h-10 rounded bg-gray-50 px-2 outline outline-gray-400 placeholder:text-gray-400 focus:outline-4 focus:outline-amber-400 disabled:opacity-50"
      >
        {data.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
