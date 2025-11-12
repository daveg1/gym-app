import { Divider, Text } from "../ui";

interface Props {
  text: string;
}

export function TextSeparator({ text }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Divider />
      <Text size="s">{text}</Text>
      <Divider />
    </div>
  );
}
