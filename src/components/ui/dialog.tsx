import { useRef } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  ref: React.RefObject<HTMLDialogElement>;
}

export function Dialog({ title, ref, children }: Props) {
  return (
    <>
      <dialog ref={ref} className="fixed z-50 mt-40 w-full">
        <section className="mx-4 flex flex-col gap-2 rounded border bg-white p-4">
          <header>
            <h2 className="text-xl font-semibold">{title}</h2>
          </header>

          <main>{children}</main>
        </section>
      </dialog>
    </>
  );
}

export function useDialogRef() {
  const ref = useRef<HTMLDialogElement>(null!);

  return [ref];
}
