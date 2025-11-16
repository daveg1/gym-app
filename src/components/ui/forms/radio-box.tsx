import clsx from "clsx";
import { Text } from "../text";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function RadioBox({ label, className, ...props }: Props) {
  return (
    <label className={clsx("flex gap-1", className)}>
      <input {...props} name="exercise-type" type="radio" />
      {label && <Text>{label}</Text>}
    </label>
  );
}
