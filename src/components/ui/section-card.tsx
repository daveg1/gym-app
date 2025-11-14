import { Text } from "./text";

interface Props {
  title: string;
  caption?: string;
  children?: React.ReactNode;
}

export function SectionCard({ title, caption, children }: Props) {
  return (
    <section className="rounded-xl bg-gray-100 p-4">
      <header>
        <h2 className="text-lg font-semibold">{title}</h2>
        {caption && <Text size="s">{caption}</Text>}
      </header>

      {children && <main>{children}</main>}
    </section>
  );
}
