import clsx from "clsx";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  text: string;
  caption?: string;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  isEditing?: boolean;
};

export function Header({
  text,
  caption,
  leftSide,
  rightSide,
  isEditing,
  ...htmlProps
}: Readonly<Props>) {
  return (
    <header className="flex min-h-12 items-center gap-4 px-6" {...htmlProps}>
      {leftSide && <aside>{leftSide}</aside>}

      <div className="flex flex-col">
        <h2
          className={clsx(
            "text-3xl leading-none font-semibold",
            isEditing && "rounded outline outline-offset-4 outline-amber-400",
          )}
        >
          {text}
        </h2>
        {caption && <p className="text-lg">{caption}</p>}
      </div>

      {rightSide && <aside className="ml-auto">{rightSide}</aside>}
    </header>
  );
}
