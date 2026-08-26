"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function HeavyScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frameId: number | null = null;

    const destroy = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => {
      destroy();
      if (!finePointer.matches || reducedMotion.matches) return;

      const isMac = /Mac/i.test(navigator.platform);
      lenis = new Lenis({
        autoRaf: false,
        anchors: true,
        lerp: 0.075,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: isMac ? 0.72 : 0.9,
        gestureOrientation: "vertical",
      });

      const frame = (time: number) => {
        lenis?.raf(time);
        frameId = window.requestAnimationFrame(frame);
      };

      frameId = window.requestAnimationFrame(frame);
    };

    sync();
    const restoreFromPageCache = () => {
      if (!lenis) sync();
    };

    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);
    window.addEventListener("pageshow", restoreFromPageCache);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
      window.removeEventListener("pageshow", restoreFromPageCache);
      destroy();
    };
  }, []);

  return children;
}
