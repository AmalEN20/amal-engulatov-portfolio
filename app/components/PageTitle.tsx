import type { CSSProperties } from "react";

type PageTitleProps = {
  children: string;
  className?: string;
};

export function PageTitle({ children, className = "" }: PageTitleProps) {
  const words = children.trim().split(/\s+/);

  return (
    <h1 className={`page-title ${className}`.trim()} aria-label={children}>
      <span className="page-title-line" aria-hidden="true">
        {words.map((word, index) => (
          <span className="page-title-word-mask" key={`${word}-${index}`}>
            <span
              className="page-title-word"
              style={{ "--word-index": index } as CSSProperties}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </h1>
  );
}
