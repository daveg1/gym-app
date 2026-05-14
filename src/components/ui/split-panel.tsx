import { CloseIcon } from "../icons";
import { Button } from "./button/button";

interface Props {
  title: string;
  mainContent: React.ReactNode;
  isOpen: boolean;
  onClose(): void;
}

export function SplitPanel(props: Props) {
  if (!props.isOpen) return;

  return (
    <div className="animate-slide-up absolute inset-x-0 bottom-0 flex h-[380px] flex-col rounded-t-3xl bg-gray-100">
      <header className="flex items-center justify-between p-4 pl-6 font-semibold">
        <h2 className="text-xl">{props.title}</h2>
        <Button onClick={() => props.onClose()}>
          <CloseIcon />
        </Button>
      </header>

      <main className="h-full overflow-auto pb-6">{props.mainContent}</main>
    </div>
  );
}
