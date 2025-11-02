interface Props {
  text: string;
  caption?: string;
}

export function Header({ text, caption }: Readonly<Props>) {
  return (
    <header className="flex flex-col justify-center gap-1 px-6">
      <h2 className="text-3xl font-semibold">{text}</h2>
      {caption && <p className="text-lg">{caption}</p>}
    </header>
  );
}
