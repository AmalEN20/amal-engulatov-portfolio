"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { TransitionLink } from "../components/SiteShell";
import { PROJECTS_RETURN_STORAGE_KEY } from "./projectReturn";

export function BackToProjectsLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const markProjectsReturn = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) {
      return;
    }

    try {
      window.sessionStorage.setItem(PROJECTS_RETURN_STORAGE_KEY, "cards");
    } catch {
      // Navigation remains usable when storage is unavailable.
    }
  };

  return (
    <TransitionLink
      href="/work"
      transitionLabel="Projects"
      className={className}
      onClick={markProjectsReturn}
    >
      {children}
    </TransitionLink>
  );
}
