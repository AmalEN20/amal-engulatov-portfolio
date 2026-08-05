"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AsciiPortrait } from "./AsciiPortrait";
import styles from "./HomeHero.module.css";

type MotionState = "static" | "waiting" | "entered";

const PARTICLE_SCATTER_START = 0.1;
const IDENTITY_ERASE_END = 0.6;
const WORK_REVEAL_START = 0.68;
const WORK_REVEAL_END = 0.82;
const NAV_BRAND_REVEAL = 0.605;

export function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [motionState, setMotionState] = useState<MotionState>("static");

  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enterFrame = 0;
    let settleFrame = 0;
    let cancelled = false;

    const enterWhenReady = () => {
      if (cancelled || motionQuery.matches) {
        setMotionState("static");
        return;
      }

      const routeIsCovered = root.dataset.routeTransition === "covered";
      const contentIsHidden = root.dataset.routeContent === "hidden";
      const introIsActive = root.dataset.intro === "active";

      if (routeIsCovered || contentIsHidden || introIsActive) return;

      enterFrame = window.requestAnimationFrame(() => {
        settleFrame = window.requestAnimationFrame(() => {
          if (!cancelled) setMotionState("entered");
        });
      });
    };

    if (!motionQuery.matches) {
      enterFrame = window.requestAnimationFrame(() => {
        setMotionState("waiting");
        enterWhenReady();
      });
    }

    const rootObserver = new MutationObserver(enterWhenReady);
    rootObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-intro", "data-route-content", "data-route-transition"],
    });

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        setMotionState("static");
      } else {
        setMotionState("waiting");
        enterWhenReady();
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(enterFrame);
      window.cancelAnimationFrame(settleFrame);
      rootObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateProgress = () => {
      if (motionQuery.matches) {
        progressRef.current = 0;
        hero.style.setProperty("--hero-progress", "0");
        hero.style.setProperty("--work-offset", "0%");
        hero.style.setProperty("--work-progress", "1");
        hero.dataset.particles = "idle";
        hero.dataset.erased = "false";
        document.documentElement.dataset.homeHero = "cleared";
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -bounds.top / travel));
      const workLinear = Math.min(
        1,
        Math.max(0, (progress - WORK_REVEAL_START) / (WORK_REVEAL_END - WORK_REVEAL_START)),
      );
      const workProgress = workLinear * workLinear * (3 - 2 * workLinear);

      progressRef.current = progress;
      hero.style.setProperty("--hero-progress", progress.toFixed(4));
      hero.style.setProperty("--work-offset", `${((1 - workProgress) * 112).toFixed(2)}%`);
      hero.style.setProperty("--work-progress", workProgress.toFixed(4));
      hero.dataset.particles =
        progress >= PARTICLE_SCATTER_START && progress < IDENTITY_ERASE_END
          ? "active"
          : "idle";
      hero.dataset.erased = progress >= IDENTITY_ERASE_END ? "true" : "false";
      document.documentElement.dataset.homeHero =
        progress >= NAV_BRAND_REVEAL
          ? "cleared"
          : progress > 0.05
            ? "exiting"
            : "intro";
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    motionQuery.addEventListener("change", updateProgress);

    return () => {
      delete document.documentElement.dataset.homeHero;
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      motionQuery.removeEventListener("change", updateProgress);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className={styles.hero}
      data-erased="false"
      data-motion={motionState}
      data-particles="idle"
      style={
        {
          "--hero-progress": 0,
          "--work-offset": "112%",
          "--work-progress": 0,
        } as CSSProperties
      }
    >
      <div className={styles.heroStage}>
        <section className={styles.heroScene} id="top" aria-label="Introduction">
          <div className={styles.identity}>
            <h1 className={styles.heroTitle} aria-label="Amal Engulatov">
              <span
                className={`page-title-word-mask ${styles.titleMask} ${styles.givenMask}`}
                data-particle-erase="true"
                aria-hidden="true"
              >
                <span
                  className={`page-title-word ${styles.titleWord} ${styles.givenWord}`}
                  style={{ "--word-index": 0 } as CSSProperties}
                >
                  Amal
                </span>
              </span>

              <span
                className={`${styles.titleMask} ${styles.surnameMask}`}
                data-particle-erase="true"
                aria-hidden="true"
              >
                <span className={`${styles.titleWord} ${styles.surnameWord}`}>
                  ENG
                </span>
              </span>
            </h1>
          </div>

          <AsciiPortrait className={styles.portrait} scrollProgressRef={progressRef} />

          <div className={styles.metaObject} data-particle-erase="true">
            <span className={styles.visuallyHidden}>
              Based in Seattle, Washington and New York. Focused on Frontend
              Development, Product, and AI.
            </span>

            <div className={styles.metaScene} aria-hidden="true">
              <div className={styles.metaRotor}>
                <div className={`${styles.metaFace} ${styles.metaFront}`}>
                  <span className={styles.metaLabel}>Based in</span>
                  <span className={styles.metaValueMask}>
                    <span className={`${styles.metaValueTrack} ${styles.basedValueTrack}`}>
                      <span className={styles.metaValue}>Seattle, Washington</span>
                      <span className={styles.metaValue}>New York</span>
                    </span>
                  </span>
                </div>

                <div className={`${styles.metaFace} ${styles.metaBack}`}>
                  <span className={styles.metaLabel}>Focused on</span>
                  <span className={styles.metaValueMask}>
                    <span className={`${styles.metaValueTrack} ${styles.focusValueTrack}`}>
                      <span className={styles.metaValue}>Frontend Development</span>
                      <span className={styles.metaValue}>Product · AI</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.metaReduced} aria-hidden="true">
              <span>
                <span className={styles.metaLabel}>Based in</span>
                <span className={styles.metaValue}>Seattle, Washington</span>
              </span>
              <span>
                <span className={styles.metaLabel}>Focused on</span>
                <span className={styles.metaValue}>Frontend Development</span>
              </span>
            </div>
          </div>
        </section>

        <section className={styles.workArrival} id="work" aria-label="Work section">
          <h2 className={styles.workTitle}>
            <span className={styles.workTitleMask}>
              <span className={styles.workTitleWord}>Work</span>
            </span>
          </h2>
        </section>
      </div>
    </div>
  );
}
