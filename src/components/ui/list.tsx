export function List({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full flex-col gap-4 overflow-y-auto px-6 py-4">
      {children}
      <div className="list-fade fixed inset-x-0 bottom-22 z-50 h-8 min-h-4"></div>
    </div>
  );
}
