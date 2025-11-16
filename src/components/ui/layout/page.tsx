type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  children: React.ReactNode;
};

export function Page({ children, ...props }: Readonly<Props>) {
  return (
    <section
      className="flex h-full flex-col gap-4 overflow-y-auto pt-6"
      {...props}
    >
      {children}
    </section>
  );
}
