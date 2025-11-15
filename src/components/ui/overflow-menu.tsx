import { useState } from "react";
import { Button } from "./button";
import { OverflowMenuIcon } from "../icons";

interface Props {
  items: React.ReactNode;
  disabled?: boolean;
}

export function OverflowMenu({ items, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div
          className="absolute inset-0 z-40 bg-black/20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className="relative z-50">
        <Button
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <OverflowMenuIcon />
        </Button>

        {isOpen && (
          <div className="absolute right-0 mt-2 flex flex-col overflow-hidden rounded-xl bg-white shadow-lg">
            {items}
          </div>
        )}
      </div>
    </>
  );
}
