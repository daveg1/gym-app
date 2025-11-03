export function Page({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto py-6">
      {children}
    </section>
  );
}
