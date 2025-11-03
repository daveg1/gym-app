interface Props {
  text: string;
  caption?: string;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
}

export function Header({
  text,
  caption,
  leftSide,
  rightSide,
}: Readonly<Props>) {
  return (
    <header className="flex gap-4 px-6">
      {leftSide && <aside>{leftSide}</aside>}

      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-semibold">{text}</h2>
        {caption && <p className="text-lg">{caption}</p>}
      </div>

      {rightSide && <aside className="ml-auto">{rightSide}</aside>}
    </header>
  );
}
