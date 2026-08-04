"use client";

import { useEffect, useState } from "react";

type IntroPhase = "holding" | "text-exiting" | "curtain-exiting" | "complete";

export function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>("holding");

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.dataset.intro = "active";

    const textExitTimer = window.setTimeout(
      () => setPhase("text-exiting"),
      reducedMotion ? 10 : 1250,
    );
    const curtainExitTimer = window.setTimeout(
      () => setPhase("curtain-exiting"),
      reducedMotion ? 20 : 1780,
    );
    const completeTimer = window.setTimeout(
      () => {
        setPhase("complete");
        delete root.dataset.intro;
      },
      reducedMotion ? 70 : 3020,
    );

    return () => {
      window.clearTimeout(textExitTimer);
      window.clearTimeout(curtainExitTimer);
      window.clearTimeout(completeTimer);
      delete root.dataset.intro;
    };
  }, []);

  if (phase === "complete") return null;

  return (
    <div className={`site-loader site-loader-${phase}`} aria-hidden="true">
      <div className="intro-curtain" />
      <p className="loader-copy">
        <span>Passion to build</span>
        <strong>something cool.</strong>
      </p>
    </div>
  );
}
