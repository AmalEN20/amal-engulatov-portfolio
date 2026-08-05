"use client";

import Lenis from "lenis";
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
  const lenisRef = useRef<Lenis | null>(null);
  const lenisFrame = useRef<number | null>(null);
  const previousPathname = useRef(pathname);
  const [transition, setTransition] = useState<TransitionState>(initialTransition);

  const scrollDestinationToTop = useCallback(() => {
    const root = document.documentElement;
    const body = document.body;
    const rootScrollBehavior = root.style.scrollBehavior;
    const bodyScrollBehavior = body.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = rootScrollBehavior;
    body.style.scrollBehavior = bodyScrollBehavior;
  }, []);

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

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      lenisRef.current?.stop();
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
    const desktopPointer = window.matchMedia("(min-width: 769px) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const destroyLenis = () => {
      if (lenisFrame.current !== null) {
        window.cancelAnimationFrame(lenisFrame.current);
        lenisFrame.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const syncLenis = () => {
      destroyLenis();
      const touchCapable = navigator.maxTouchPoints > 0;
      if (!desktopPointer.matches || reducedMotion.matches || touchCapable) return;

      const isMac = /Mac/i.test(navigator.platform);

      const lenis = new Lenis({
        autoRaf: false,
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lerp: 0.105,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: isMac ? 0.6 : 0.85,
        gestureOrientation: "vertical",
      });

      lenisRef.current = lenis;
      if (transitionLocked.current) lenis.stop();

      const frame = (time: number) => {
        lenis.raf(time);
        lenisFrame.current = window.requestAnimationFrame(frame);
      };
      lenisFrame.current = window.requestAnimationFrame(frame);
    };

    syncLenis();
    desktopPointer.addEventListener("change", syncLenis);
    reducedMotion.addEventListener("change", syncLenis);

    return () => {
      desktopPointer.removeEventListener("change", syncLenis);
      reducedMotion.removeEventListener("change", syncLenis);
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (transition.phase === "idle") {
      lenisRef.current?.start();
      return;
    }

    lenisRef.current?.stop();
  }, [transition.phase]);

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
      router.push(href, { scroll: false });
    }, 780);

    return () => window.clearTimeout(coverTimer);
  }, [router, transition]);

  useEffect(() => {
    if (transition.phase !== "covered" || pathname !== transition.href) return;

    scrollDestinationToTop();
    const activeRequest = transition.requestId;
    const revealTimer = window.setTimeout(() => {
      document.documentElement.dataset.routeContent = "revealing";
      setTransition((current) =>
        current.requestId === activeRequest ? { ...current, phase: "revealing" } : current,
      );
    }, 60);

    return () => window.clearTimeout(revealTimer);
  }, [pathname, scrollDestinationToTop, transition]);

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
    if (transitionLocked.current) return;

    scrollDestinationToTop();
    focusPageHeading();
  }, [focusPageHeading, pathname, scrollDestinationToTop]);

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
