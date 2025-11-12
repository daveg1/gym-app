interface Props {
  hasFade?: boolean;
  children: React.ReactNode;
}

export function List({ hasFade, children }: Props) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex h-full flex-col gap-4 overflow-y-auto px-6 py-4">
        {children}
      </div>
      {hasFade && (
        <div className="list-fade absolute inset-x-0 -bottom-2 z-30 h-10 min-h-4"></div>
      )}
    </div>
  );
}
