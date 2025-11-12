interface Props {
  hasFade?: boolean;
  children: React.ReactNode;
}

export function List({ hasFade, children }: Props) {
  return (
    <div className="relative flex h-full flex-col gap-4 overflow-y-auto px-6 py-4">
      {children}
      {hasFade && (
        <div className="list-fade fixed inset-x-0 bottom-22 z-30 h-8 min-h-4"></div>
      )}
    </div>
  );
}
