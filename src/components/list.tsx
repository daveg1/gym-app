export function List({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto px-6 py-4">
      {children}
    </div>
  );
}
