"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ComponentProps, MouseEvent as ReactMouseEvent } from "react";
import { SiteIntro } from "./SiteIntro";

type TransitionPhase = "idle" | "covering" | "covered" | "revealing";

type TransitionState = {
  phase: TransitionPhase;
  href: string;
  label: string;
  requestId: number;
};

const initialTransition: TransitionState = {
  phase: "idle",
  href: "",
  label: "",
  requestId: 0,
};

const TransitionContext = createContext<{
  navigate: (href: string, label: string) => void;
  pathname: string;
} | null>(null);

function labelFromHref(href: string) {
  if (href === "/") return "Home";
  if (href === "/work") return "Projects";
  if (href === "/about") return "About";
  if (href === "/contact") return "Contact";

  const lastPart = href.split("/").filter(Boolean).pop() ?? "Next";
  return lastPart
    .split("-")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string;
  transitionLabel?: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
};

export function TransitionLink({
  href,
  transitionLabel,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const transition = useContext(TransitionContext);

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      href.startsWith("#") ||
      !transition ||
      href === transition.pathname
    ) {
      return;
    }

    event.preventDefault();
    transition.navigate(href, transitionLabel ?? labelFromHref(href));
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export function SiteShell({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const requestId = useRef(0);
  const transitionLocked = useRef(false);
  const previousPathname = useRef(pathname);
  const [transition, setTransition] = useState<TransitionState>(initialTransition);

  const focusPageHeading = useCallback(() => {
    window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>("main h1");
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  }, []);

  const resetTransition = useCallback(() => {
    const root = document.documentElement;
    delete root.dataset.routeTransition;
    delete root.dataset.routeContent;
    transitionLocked.current = false;
    setTransition(initialTransition);
  }, []);

  const navigate = useCallback(
    (href: string, label: string) => {
      if (transitionLocked.current || href === pathname) return;

      window.scrollTo(0, 0);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      transitionLocked.current = true;
      requestId.current += 1;
      setTransition({
        phase: "covering",
        href,
        label,
        requestId: requestId.current,
      });
    },
    [pathname, router],
  );

  useEffect(() => {
    const root = document.documentElement;
    if (transition.phase === "idle") {
      delete root.dataset.transition;
      delete root.dataset.routeTransition;
      delete root.dataset.routeContent;
      return;
    }

    root.dataset.transition = "active";
    root.dataset.routeTransition = transition.phase;
  }, [transition.phase]);

  useEffect(() => {
    if (transition.phase !== "covering") return;

    const { href, requestId: activeRequest } = transition;
    const coverTimer = window.setTimeout(() => {
      const root = document.documentElement;
      root.dataset.routeTransition = "covered";
      root.dataset.routeContent = "hidden";
      setTransition((current) =>
        current.requestId === activeRequest ? { ...current, phase: "covered" } : current,
      );
      window.scrollTo(0, 0);
      router.push(href);
    }, 780);

    return () => window.clearTimeout(coverTimer);
  }, [router, transition]);

  useEffect(() => {
    if (transition.phase !== "covered" || pathname !== transition.href) return;

    const activeRequest = transition.requestId;
    const revealTimer = window.setTimeout(() => {
      document.documentElement.dataset.routeContent = "revealing";
      setTransition((current) =>
        current.requestId === activeRequest ? { ...current, phase: "revealing" } : current,
      );
    }, 60);

    return () => window.clearTimeout(revealTimer);
  }, [pathname, transition]);

  useEffect(() => {
    if (transition.phase !== "revealing") return;

    const activeRequest = transition.requestId;
    const finishTimer = window.setTimeout(() => {
      if (requestId.current !== activeRequest) return;
      transitionLocked.current = false;
      setTransition((current) => {
        if (current.requestId !== activeRequest) return current;
        return initialTransition;
      });
      focusPageHeading();
    }, 1100);

    return () => window.clearTimeout(finishTimer);
  }, [focusPageHeading, transition]);

  useEffect(() => {
    if (transition.phase === "idle") return;

    const watchdog = window.setTimeout(resetTransition, 3000);
    return () => window.clearTimeout(watchdog);
  }, [resetTransition, transition.phase]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (!transitionLocked.current) focusPageHeading();
  }, [focusPageHeading, pathname]);

  return (
    <TransitionContext.Provider value={{ navigate, pathname }}>
      <SiteIntro />
      <div className="route-shell-nav">{navigation}</div>
      <div className="route-page-frame" key={pathname}>
        {children}
      </div>

      {transition.phase !== "idle" && (
        <div
          className="route-transition-stage"
          data-phase={transition.phase}
          aria-live="polite"
          aria-label={`Going to ${transition.label}`}
        >
          <div className="route-transition-backdrop" aria-hidden="true" />
          <div className="route-transition-surface">
            <i className="route-transition-edge" aria-hidden="true" />
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
