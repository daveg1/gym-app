import { useState } from "react";

export interface DialogRef {
  isOpen: boolean;
  showDialog(): void;
  hideDialog(): void; // TODO: rename to closeDialog
}

interface Props {
  title: string;
  children: React.ReactNode;
  ref: DialogRef;
}

export function Dialog({ title, ref, children }: Props) {
  if (!ref.isOpen) return null;

  return (
    <>
      <div
        className="absolute inset-0 z-40 bg-black/20"
        onClick={() => ref.hideDialog()}
      ></div>

      <div className="fixed z-50 mt-[25%] w-full">
        <section className="mx-4 flex flex-col gap-2 rounded-xl bg-white p-4 shadow-md">
          <header>
            <h2 className="text-xl font-semibold">{title}</h2>
          </header>

          <main>{children}</main>
        </section>
      </div>
    </>
  );
}

export function useDialogRef(): DialogRef {
  const [isOpen, setIsOpen] = useState(false);

  const showDialog = () => {
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
  };

  return { isOpen, showDialog, hideDialog };
}
