import { useState } from "react";
import { Button } from "./button";

interface Props {
  items: React.ReactNode;
}

export function OverflowMenu({ items }: Props) {
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
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              clipRule="evenodd"
            />
          </svg>
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
