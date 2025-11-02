interface Props {
  text: string;
}

export function Header({ text }: Readonly<Props>) {
  return (
    <header className="flex items-center gap-2 px-6">
      <h2 className="text-3xl font-semibold">{text}</h2>
    </header>
  );
}
