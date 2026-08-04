"use client";

import { useEffect, useState } from "react";

type IntroPhase = "holding" | "text-exiting" | "stairs-exiting" | "complete";

const panels = Array.from({ length: 8 });

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
    const stairsExitTimer = window.setTimeout(
      () => setPhase("stairs-exiting"),
      reducedMotion ? 20 : 1850,
    );
    const completeTimer = window.setTimeout(
      () => {
        setPhase("complete");
        delete root.dataset.intro;
      },
      reducedMotion ? 70 : 3250,
    );

    return () => {
      window.clearTimeout(textExitTimer);
      window.clearTimeout(stairsExitTimer);
      window.clearTimeout(completeTimer);
      delete root.dataset.intro;
    };
  }, []);

  if (phase === "complete") return null;

  return (
    <div className={`site-loader site-loader-${phase}`} aria-hidden="true">
      <p className="loader-copy">
        <span>Passion to build</span>
        <strong>something cool.</strong>
      </p>

      <div className="stairs-row stairs-row-top">
        {panels.map((_, index) => <i key={`top-${index}`} />)}
      </div>
      <div className="stairs-row stairs-row-bottom">
        {panels.map((_, index) => <i key={`bottom-${index}`} />)}
      </div>
    </div>
  );
}
