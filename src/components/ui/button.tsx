export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?(): void;
}) {
  return (
    <button
      className="h-8 cursor-pointer rounded bg-stone-400 px-2"
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}
