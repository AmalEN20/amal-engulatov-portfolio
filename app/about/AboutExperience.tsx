"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { TransitionLink } from "../components/SiteShell";
import styles from "./about.module.css";

const heroTitle = "I build complex digital products—from idea to working applications.";
const storyTitle = "I wanted to understand how the whole product works.";
const educationTitle = "Education & certificates.";
const opportunityTitle = "I’m open to building what comes next.";

type MotionStyle = CSSProperties & {
  "--about-entry-index"?: number;
  "--about-word-index"?: number;
};

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(start: number, end: number, value: number) {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function MotionBlock({
  children,
  className = "",
  index,
  entry = false,
  role,
}: {
  children: ReactNode;
  className?: string;
  index: number;
  entry?: boolean;
  role: "label" | "footer";
}) {
  return (
    <div
      className={`${styles.motionBlock} ${className}`.trim()}
      data-about-item
      data-about-role={role}
      data-index={index}
    >
      <div
        className={styles.entryBlock}
        data-about-entry={entry ? "true" : undefined}
        style={{ "--about-entry-index": index } as MotionStyle}
      >
        {children}
      </div>
    </div>
  );
}

function MaskedHeading({
  as: Tag,
  className,
  entry = false,
  id,
  index,
  text,
}: {
  as: "h1" | "h2";
  className: string;
  entry?: boolean;
  id: string;
  index: number;
  text: string;
}) {
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      id={id}
      aria-label={text}
      data-about-item
      data-about-role="heading"
      data-index={index}
    >
      <span className={styles.titleWords} aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span className={styles.titleWordMask} key={`${word}-${wordIndex}`}>
            <span
              className={styles.titleWord}
              data-about-entry={entry ? "true" : undefined}
              style={
                {
                  "--about-entry-index": index,
                  "--about-word-index": wordIndex,
                } as MotionStyle
              }
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

export function AboutExperience() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const scenes = Array.from(page.querySelectorAll<HTMLElement>("[data-about-scene]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const renderedProgress = scenes.map(() => 0);
    const targetProgress = scenes.map(() => 0);
    let animationFrame = 0;
    let motionEnabled = !reducedMotion.matches;

    page.style.setProperty(
      "--about-entry-base-delay",
      document.documentElement.dataset.intro === "active" ? "1780ms" : "0ms",
    );

    const measureProgress = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);

      if (page.scrollHeight <= viewportHeight + 2) {
        targetProgress.fill(0.5);
        return;
      }

      scenes.forEach((scene, sceneIndex) => {
        const rect = scene.getBoundingClientRect();

        if (sceneIndex === scenes.length - 1 && rect.bottom <= viewportHeight + 2) {
          targetProgress[sceneIndex] = 0.5;
          return;
        }

        if (sceneIndex === 0 && rect.top <= 0) {
          targetProgress[sceneIndex] = clamp(
            0.5 + (Math.abs(rect.top) / Math.max(rect.height, 1)) * 0.5,
          );
          return;
        }

        targetProgress[sceneIndex] = clamp(
          (viewportHeight - rect.top) / (viewportHeight + Math.max(rect.height, 1)),
        );
      });
    };

    const applySceneMotion = (scene: HTMLElement, progress: number) => {
      const items = Array.from(scene.querySelectorAll<HTMLElement>("[data-about-item]"));

      scene.dataset.sceneActive = progress > 0.015 && progress < 0.985 ? "true" : "false";

      items.forEach((item) => {
        const role = item.dataset.aboutRole;
        const isHeading = role === "heading";
        const enter = smoothstep(isHeading ? 0.08 : 0.16, isHeading ? 0.34 : 0.41, progress);
        const exit = smoothstep(isHeading ? 0.58 : 0.63, isHeading ? 0.78 : 0.83, progress);
        const opacity = clamp(enter * (1 - exit));
        const travel = (1 - enter) * (isHeading ? 24 : 18) - exit * (isHeading ? 28 : 22);

        item.style.setProperty("--about-item-opacity", opacity.toFixed(4));
        item.style.setProperty("--about-item-y", `${travel.toFixed(2)}px`);
      });
    };

    const updateMotion = () => {
      animationFrame = 0;
      if (!motionEnabled) return;

      measureProgress();
      let settled = true;

      scenes.forEach((scene, sceneIndex) => {
        const target = targetProgress[sceneIndex];
        const current = renderedProgress[sceneIndex];
        const next = coarsePointer.matches ? target : current + (target - current) * 0.1;
        const difference = Math.abs(target - next);
        const resolved = difference < 0.00035 ? target : next;

        renderedProgress[sceneIndex] = resolved;
        if (resolved !== target) settled = false;
        applySceneMotion(scene, resolved);
      });

      page.dataset.motion = "active";
      if (!settled) animationFrame = window.requestAnimationFrame(updateMotion);
    };

    const requestMotionUpdate = () => {
      if (!motionEnabled || animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateMotion);
    };

    const initialiseMotion = () => {
      measureProgress();
      targetProgress.forEach((progress, index) => {
        renderedProgress[index] = progress;
      });
      scenes.forEach((scene, index) => applySceneMotion(scene, renderedProgress[index]));
      page.dataset.motion = "active";
    };

    const syncMotionPreference = () => {
      motionEnabled = !reducedMotion.matches;

      if (!motionEnabled) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        page.dataset.motion = "reduced";
        scenes.forEach((scene) => {
          scene.dataset.sceneActive = "false";
        });
        return;
      }

      requestMotionUpdate();
    };

    const handleResize = () => {
      measureProgress();
      targetProgress.forEach((progress, index) => {
        renderedProgress[index] = progress;
      });
      requestMotionUpdate();
    };

    initialiseMotion();
    window.addEventListener("scroll", requestMotionUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestMotionUpdate);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", syncMotionPreference);
      delete page.dataset.motion;
    };
  }, []);

  return (
    <main className={styles.aboutPage} ref={pageRef}>
      <section
        className={`${styles.scene} ${styles.heroScene}`}
        data-about-scene="hero"
        aria-labelledby="about-hero-title"
      >
        <div className={`${styles.sceneFrame} ${styles.heroFrame}`}>
          <div className={styles.sectionGrid}>
            <MaskedHeading
              as="h1"
              className={styles.sectionTitle}
              entry
              id="about-hero-title"
              index={0}
              text={heroTitle}
            />

            <MotionBlock className={styles.sectionFooter} index={1} entry role="footer">
              <p className={styles.sectionCopy}>
                I’m Amal Engulatov, a full-stack developer based in Seattle, creating
                websites and applications across frontend, backend, data, and integrations.
              </p>
            </MotionBlock>
          </div>
        </div>
      </section>

      <section
        className={`${styles.scene} ${styles.storyScene}`}
        data-about-scene="story"
        aria-labelledby="about-story-title"
      >
        <div className={`${styles.sceneFrame} ${styles.storyFrame}`}>
          <div className={styles.sectionGrid}>
            <MaskedHeading
              as="h2"
              className={styles.sectionTitle}
              entry
              id="about-story-title"
              index={2}
              text={storyTitle}
            />

            <MotionBlock className={styles.sectionFooter} index={3} entry role="footer">
              <p className={styles.sectionCopy}>
                I started with interfaces, then moved deeper into application logic, data,
                and the systems connecting everything together. Today, I build complete
                digital products—not isolated screens.
              </p>
            </MotionBlock>
          </div>
        </div>
      </section>

      <section
        className={`${styles.scene} ${styles.educationScene}`}
        data-about-scene="education"
        aria-labelledby="about-education-title"
      >
        <div className={`${styles.sceneFrame} ${styles.educationFrame}`}>
          <div className={styles.sectionGrid}>
            <MaskedHeading
              as="h2"
              className={styles.sectionTitle}
              entry
              id="about-education-title"
              index={4}
              text={educationTitle}
            />

            <MotionBlock className={styles.sectionFooter} index={5} entry role="footer">
              <ul className={styles.educationList}>
                <li className={styles.educationItem}>
                  <span className={styles.educationInstitution}>University of Washington</span>
                  <span className={styles.educationCredential}>
                    Full Stack Web Development Boot Camp Certificate, Computer Science
                  </span>
                </li>
                <li className={styles.educationItem}>
                  <span className={styles.educationInstitution}>Meta</span>
                  <span className={styles.educationCredential}>
                    Front-End Developer Professional Certificate
                  </span>
                </li>
                <li className={styles.educationItem}>
                  <span className={styles.educationInstitution}>Bellevue College</span>
                  <span className={styles.educationCredential}>
                    Associate Degree Transfer Program —{" "}
                    <strong className={styles.educationStatus}>In Progress</strong>
                  </span>
                </li>
              </ul>
            </MotionBlock>
          </div>
        </div>
      </section>

      <section
        className={`${styles.scene} ${styles.opportunityScene}`}
        data-about-scene="opportunity"
        aria-labelledby="about-opportunity-title"
      >
        <div className={`${styles.sceneFrame} ${styles.opportunityFrame}`}>
          <div className={styles.sectionGrid}>
            <MaskedHeading
              as="h2"
              className={styles.sectionTitle}
              entry
              id="about-opportunity-title"
              index={6}
              text={opportunityTitle}
            />

            <MotionBlock className={styles.sectionFooter} index={7} entry role="footer">
              <p className={styles.sectionCopy}>
                I’m open to opportunities across software development—from full-stack
                applications and websites to backend systems and AI-powered products.
              </p>
              <nav className={styles.compactActions} aria-label="About page actions">
                <TransitionLink href="/work" transitionLabel="Projects">
                  View my work
                </TransitionLink>
                <TransitionLink href="/contact" transitionLabel="Contact">
                  Let’s talk
                </TransitionLink>
              </nav>
            </MotionBlock>
          </div>
        </div>
      </section>
    </main>
  );
}
