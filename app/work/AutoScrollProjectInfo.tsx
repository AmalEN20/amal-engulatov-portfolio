"use client";

import { useEffect, useRef, type ReactNode } from "react";

type AutoScrollProjectInfoProps = {
  ariaLabel: string;
  children: ReactNode;
  className: string;
};

const AUTO_SPEED = 7.5;
const RESUME_DELAY = 80;
const VELOCITY_RESPONSE = 2.4;
const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

export function AutoScrollProjectInfo({
  ariaLabel,
  children,
  className,
}: AutoScrollProjectInfoProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 701px)");
    let animationFrame = 0;
    let direction = 1;
    let lastFrame = performance.now();
    let maxScroll = 0;
    let position = region.scrollTop;
    let resumeAt = performance.now();
    let velocity = AUTO_SPEED;

    const routeIsReady = () => {
      const state = document.documentElement.dataset.routeContent;
      return state !== "hidden" && document.documentElement.dataset.intro !== "active";
    };

    const canAnimate = () => (
      desktop.matches
      && !reducedMotion.matches
      && !document.hidden
      && routeIsReady()
      && maxScroll > 0.5
    );

    const stop = () => {
      if (!animationFrame) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const tick = (now: number) => {
      animationFrame = 0;
      if (!canAnimate()) return;

      const deltaTime = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      if (now >= resumeAt) {
        if (position >= maxScroll - 0.25 && direction > 0) direction = -1;
        if (position <= 0.25 && direction < 0) direction = 1;

        const targetVelocity = direction * AUTO_SPEED;
        const velocityBlend = 1 - Math.exp(-deltaTime * VELOCITY_RESPONSE);
        velocity += (targetVelocity - velocity) * velocityBlend;

        position = Math.min(maxScroll, Math.max(0, position + velocity * deltaTime));
        region.scrollTop = position;
      } else {
        position = region.scrollTop;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (animationFrame || !canAnimate()) return;
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(tick);
    };

    const syncRange = () => {
      maxScroll = Math.max(0, region.scrollHeight - region.clientHeight);
      if (region.scrollTop > maxScroll) region.scrollTop = maxScroll;
      position = region.scrollTop;
      if (canAnimate()) start();
      else stop();
    };

    const pauseForUser = () => {
      resumeAt = performance.now() + RESUME_DELAY;
      velocity = 0;
      position = region.scrollTop;
      if (region.scrollTop <= 0.25) direction = 1;
      if (region.scrollTop >= maxScroll - 0.25) direction = -1;
      start();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (SCROLL_KEYS.has(event.key)) pauseForUser();
    };

    const handleMotionPreference = () => {
      velocity = 0;
      if (reducedMotion.matches) {
        position = 0;
        region.scrollTop = 0;
      }
      syncRange();
    };

    const handleRouteState = () => {
      if (routeIsReady()) resumeAt = performance.now();
      syncRange();
    };

    const resizeObserver = new ResizeObserver(syncRange);
    const routeObserver = new MutationObserver(handleRouteState);
    resizeObserver.observe(region);
    routeObserver.observe(document.documentElement, {
      attributeFilter: ["data-intro", "data-route-content"],
      attributes: true,
    });

    region.addEventListener("keydown", handleKeyDown);
    region.addEventListener("pointerdown", pauseForUser, { passive: true });
    region.addEventListener("touchmove", pauseForUser, { passive: true });
    region.addEventListener("touchstart", pauseForUser, { passive: true });
    region.addEventListener("wheel", pauseForUser, { passive: true });
    document.addEventListener("visibilitychange", syncRange);
    desktop.addEventListener("change", syncRange);
    reducedMotion.addEventListener("change", handleMotionPreference);

    syncRange();

    return () => {
      stop();
      resizeObserver.disconnect();
      routeObserver.disconnect();
      region.removeEventListener("keydown", handleKeyDown);
      region.removeEventListener("pointerdown", pauseForUser);
      region.removeEventListener("touchmove", pauseForUser);
      region.removeEventListener("touchstart", pauseForUser);
      region.removeEventListener("wheel", pauseForUser);
      document.removeEventListener("visibilitychange", syncRange);
      desktop.removeEventListener("change", syncRange);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div
      ref={regionRef}
      className={className}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      data-lenis-prevent
    >
      {children}
    </div>
  );
}
