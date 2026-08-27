"use client";

import { useEffect, useState } from "react";
import { portfolioContent } from "../content/portfolio";

type IntroPhase = "holding" | "text-exiting" | "curtain-exiting" | "complete";

export function SiteIntro() {
  const [phase, setPhase] = useState<IntroPhase>("holding");

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setIntroLock = (active: boolean) => {
      if (active) {
        root.dataset.intro = "active";
      } else {
        delete root.dataset.intro;
      }

      window.dispatchEvent(new Event("amal:site-intro-lock"));
    };

    setIntroLock(true);

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
        setIntroLock(false);
      },
      reducedMotion ? 70 : 3020,
    );

    return () => {
      window.clearTimeout(textExitTimer);
      window.clearTimeout(curtainExitTimer);
      window.clearTimeout(completeTimer);
      setIntroLock(false);
    };
  }, []);

  if (phase === "complete") {
    return null;
  }

  return (
    <div className={`site-loader site-loader-${phase}`} aria-hidden="true">
      <div className="intro-curtain" />
      <p className="loader-copy">{portfolioContent.preloader.line}</p>
    </div>
  );
}
