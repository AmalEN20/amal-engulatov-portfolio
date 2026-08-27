"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import type { PortfolioProject } from "../content/portfolio";

type ProjectDialogProps = {
  children: ReactNode;
  project: PortfolioProject;
};

export function ProjectDialog({ children, project }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const closeFrameRef = useRef<number | null>(null);
  const closeAnimationEndRef = useRef<((event: AnimationEvent) => void) | null>(null);
  const focusFrameRef = useRef<number | null>(null);
  const closingRef = useRef(false);
  const restoreTriggerFocusRef = useRef(true);
  const originalPageStylesRef = useRef<{
    bodyOverflow: string;
    bodyPaddingRight: string;
    bodyPosition: string;
    bodyTop: string;
    bodyWidth: string;
    rootOverflow: string;
    scrollY: number;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const summaryId = `${dialogId}-summary`;

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const clearCloseAnimationListener = () => {
    const listener = closeAnimationEndRef.current;

    if (listener && dialogRef.current) {
      dialogRef.current.removeEventListener("animationend", listener);
    }

    closeAnimationEndRef.current = null;
  };

  const unlockPage = () => {
    const originalStyles = originalPageStylesRef.current;

    if (!originalStyles) {
      return;
    }

    document.body.style.overflow = originalStyles.bodyOverflow;
    document.body.style.paddingRight = originalStyles.bodyPaddingRight;
    document.body.style.position = originalStyles.bodyPosition;
    document.body.style.top = originalStyles.bodyTop;
    document.body.style.width = originalStyles.bodyWidth;
    document.documentElement.style.overflow = originalStyles.rootOverflow;
    originalPageStylesRef.current = null;
    window.scrollTo({ top: originalStyles.scrollY, left: 0, behavior: "auto" });
    delete document.documentElement.dataset.projectDialog;
    window.dispatchEvent(new Event("amal:project-dialog-lock"));
  };

  const handleClosed = () => {
    clearCloseTimer();
    clearCloseAnimationListener();
    unlockPage();
    closingRef.current = false;
    setIsOpen(false);
    setIsClosing(false);

    focusFrameRef.current = window.requestAnimationFrame(() => {
      if (restoreTriggerFocusRef.current) {
        triggerRef.current?.focus({ preventScroll: true });
      } else {
        triggerRef.current?.blur();
      }

      focusFrameRef.current = null;
    });
  };

  const closeImmediately = () => {
    clearCloseTimer();
    clearCloseAnimationListener();

    if (dialogRef.current?.open) {
      dialogRef.current.close();
    } else {
      handleClosed();
    }
  };

  const requestClose = () => {
    const dialog = dialogRef.current;

    if (!dialog?.open || closingRef.current) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      closeImmediately();
      return;
    }

    closingRef.current = true;
    setIsClosing(true);

    const handleExitComplete = (event: AnimationEvent) => {
      if (event.target !== dialog || event.animationName !== "project-close-sequence") {
        return;
      }

      clearCloseTimer();
      clearCloseAnimationListener();
      closeFrameRef.current = window.requestAnimationFrame(() => {
        closeFrameRef.current = null;
        closeImmediately();
      });
    };

    closeAnimationEndRef.current = handleExitComplete;
    dialog.addEventListener("animationend", handleExitComplete);
    closeTimerRef.current = window.setTimeout(closeImmediately, 1900);
  };

  const openDialog = () => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    originalPageStylesRef.current = {
      bodyOverflow: document.body.style.overflow,
      bodyPaddingRight: document.body.style.paddingRight,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyWidth: document.body.style.width,
      rootOverflow: document.documentElement.style.overflow,
      scrollY: window.scrollY,
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.dataset.projectDialog = "open";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${originalPageStylesRef.current.scrollY}px`;
    document.body.style.width = "100%";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.dispatchEvent(new Event("amal:project-dialog-lock"));
    closingRef.current = false;
    setIsClosing(false);
    dialog.showModal();
    dialog.focus({ preventScroll: true });
    setIsOpen(true);
  };

  useEffect(() => {
    const dialog = dialogRef.current;

    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (closeFrameRef.current !== null) {
        window.cancelAnimationFrame(closeFrameRef.current);
      }

      const closeListener = closeAnimationEndRef.current;

      if (closeListener && dialog) {
        dialog.removeEventListener("animationend", closeListener);
      }

      if (focusFrameRef.current !== null) {
        window.cancelAnimationFrame(focusFrameRef.current);
      }

      const originalStyles = originalPageStylesRef.current;

      if (originalStyles) {
        document.body.style.overflow = originalStyles.bodyOverflow;
        document.body.style.paddingRight = originalStyles.bodyPaddingRight;
        document.body.style.position = originalStyles.bodyPosition;
        document.body.style.top = originalStyles.bodyTop;
        document.body.style.width = originalStyles.bodyWidth;
        document.documentElement.style.overflow = originalStyles.rootOverflow;
        window.scrollTo({ top: originalStyles.scrollY, left: 0, behavior: "auto" });
        delete document.documentElement.dataset.projectDialog;
        window.dispatchEvent(new Event("amal:project-dialog-lock"));
      }
    };
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        className="entry-row project-trigger"
        type="button"
        aria-controls={dialogId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Open details for ${project.title}`}
        onPointerDown={() => {
          restoreTriggerFocusRef.current = false;
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            restoreTriggerFocusRef.current = true;
          }
        }}
        onClick={openDialog}
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        data-closing={isClosing ? "true" : undefined}
        data-lenis-prevent
        id={dialogId}
        tabIndex={-1}
        aria-labelledby={titleId}
        aria-describedby={summaryId}
        onCancel={(event) => {
          event.preventDefault();
          requestClose();
        }}
        onKeyDown={(event) => {
          restoreTriggerFocusRef.current = true;

          if (event.key === "Escape") {
            event.preventDefault();
            requestClose();
          }
        }}
        onPointerDown={() => {
          restoreTriggerFocusRef.current = false;
        }}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

          if (clickedOutside) {
            requestClose();
          }
        }}
        onClose={handleClosed}
      >
        <div className="project-dialog-panel">
          <button
            className="project-dialog-close-visually-hidden"
            type="button"
            tabIndex={-1}
            onClick={requestClose}
          >
            Close project details
          </button>

          <h2 id={titleId}>{project.title}</h2>

          <p className="project-dialog-summary" id={summaryId}>
            {project.summary}
          </p>

          <div className="project-dialog-divider" aria-hidden="true" />

          <p className="project-dialog-description">{project.description}</p>

          <dl className="project-dialog-details">
            <div>
              <dt>Responsibility</dt>
              <dd>{project.responsibility}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>
                <ul aria-label="Technology stack">
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          <nav className="project-dialog-actions" aria-label={`${project.title} links`}>
            {project.websiteUrl ? (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.websiteLabel}, opens in a new tab`}
              >
                {project.websiteLabel} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span>{project.websiteLabel}</span>
            )}
            {project.repositoryUrl ? (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.repositoryLabel}, opens in a new tab`}
              >
                {project.repositoryLabel} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span>{project.repositoryLabel}</span>
            )}
          </nav>
        </div>
      </dialog>
    </>
  );
}
