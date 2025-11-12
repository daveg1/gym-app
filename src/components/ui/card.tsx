import clsx from "clsx";
import { useState } from "react";

interface Props {
  title: string;
  titleContent?: React.ReactNode;
  mainContent: React.ReactNode;
  footerContent?: React.ReactNode;
  defaultOpen?: boolean;
  isEditing?: boolean;
  onTitleClick?(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>): void;
}

export function Card({
  title,
  titleContent,
  mainContent,
  footerContent,
  defaultOpen,
  isEditing,
  onTitleClick,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(defaultOpen ?? false);

  // TODO: handle ref

  return (
    <article className="flex flex-col rounded-lg bg-gray-100">
      <header
        className="flex items-center justify-between p-4"
        onClick={() => setIsExpanded((v) => !v)}
      >
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={clsx("size-6", isExpanded && "rotate-180")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          <h2
            className={clsx(
              "rounded text-xl font-semibold outline outline-offset-2 transition-all",
              !isEditing && "outline-transparent",
              isEditing && "outline-amber-400",
            )}
            onClick={(e) => onTitleClick?.(e)}
          >
            {title}
          </h2>
        </div>

        {titleContent}
      </header>

      <main
        className={clsx(
          "flex flex-col gap-2 px-6 pb-2",
          !isExpanded && "hidden",
        )}
      >
        {mainContent}
      </main>

      <footer className={clsx("px-6 pb-4", !isExpanded && "hidden")}>
        {footerContent}
      </footer>
    </article>
  );
}
