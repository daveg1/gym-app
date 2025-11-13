import clsx from "clsx";
import { useState } from "react";

interface Props {
  title: string;
  titleContent?: React.ReactNode;
  mainContent: React.ReactNode;
  footerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  defaultOpen?: boolean;
  isEditing?: boolean;
  isCollapsible?: boolean;
  onCardClick?(): void;
  onTitleClick?(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>): void;
}

export function Card({
  title,
  titleContent,
  mainContent,
  footerContent,
  rightContent,
  defaultOpen,
  isEditing,
  isCollapsible,
  onCardClick,
  onTitleClick,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(
    !isCollapsible || (defaultOpen ?? false),
  );

  // TODO: handle ref
  // TODO: ^ what does this mean?

  return (
    <article
      className="flex rounded-lg bg-gray-100"
      onClick={() => onCardClick?.()}
    >
      <div className="flex w-full flex-col">
        <header
          className={clsx(
            "flex items-center justify-between px-4",
            isCollapsible ? "py-4" : "pt-3 pb-1",
          )}
          onClick={() => isCollapsible && setIsExpanded((v) => !v)}
        >
          <div className="flex gap-2">
            {isCollapsible && (
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
            )}

            <h2
              className={clsx(
                "rounded text-xl font-semibold outline outline-offset-2",
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
            "flex flex-col gap-2 px-4 pb-3",
            !isExpanded && "hidden",
          )}
        >
          {mainContent}
        </main>

        {footerContent && (
          <footer className={clsx("px-4 pb-4", !isExpanded && "hidden")}>
            {footerContent}
          </footer>
        )}
      </div>

      {rightContent && (
        <aside className="self-center px-4">{rightContent}</aside>
      )}
    </article>
  );
}
