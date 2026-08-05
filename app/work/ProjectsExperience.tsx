"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { TransitionLink } from "../components/SiteShell";
import { portfolioProjects } from "./projects";
import styles from "./ProjectsExperience.module.css";

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(Math.max(value, minimum), maximum);

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

const smoothstep = (start: number, end: number, value: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

type MotionCard = HTMLElement & {
  dataset: DOMStringMap & { projectCard?: string };
};

const statement = "I like making new things.";
const statementWords = statement.split(" ");

export function ProjectsExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    if (!root || !scene) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(root.querySelectorAll<MotionCard>("[data-project-card]"));
    const cardLinks = cards.map((card) => card.querySelector<HTMLAnchorElement>("a"));
    let frame = 0;
    let sceneTop = 0;
    let sceneDistance = 1;

    const setCardFrame = (
      card: MotionCard,
      index: number,
      progress: number,
      mobile: boolean,
    ) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const cardWidth = mobile
        ? Math.min(viewportWidth * 0.82, 380)
        : Math.min(viewportWidth * 0.42, 600);
      const cardHeight = cardWidth / 1.85 + (mobile ? 70 : 82);
      const endX = mobile
        ? 0
        : (index === 0 ? -1 : 1) * (cardWidth / 2 + Math.min(30, viewportWidth * 0.018));
      const endY = mobile
        ? (index === 0 ? -1 : 1) * (cardHeight / 2 + 9)
        : 26;
      const direction = index === 0 ? -1 : 1;
      const startX = direction * viewportWidth * (mobile ? 0.82 : 0.72);
      const startY = direction * viewportHeight * (mobile ? -0.34 : 0.38);
      const arc = Math.sin(progress * Math.PI);
      const x = mix(startX, endX, progress) - direction * arc * viewportWidth * 0.055;
      const y = mix(startY, endY, progress) - arc * viewportHeight * 0.1;
      const z = mix(-560, 0, progress) + arc * 170;
      const rotateX = mix(index === 0 ? 28 : -22, 0, progress);
      const rotateY = mix(index === 0 ? -62 : 62, 0, progress);
      const rotateZ = mix(index === 0 ? -16 : 14, 0, progress);
      const scale = mix(mobile ? 0.5 : 0.62, 1, progress);

      card.style.width = `${cardWidth}px`;
      card.style.opacity = String(smoothstep(0.02, 0.22, progress));
      card.style.filter = `blur(${mix(5, 0, progress)}px)`;
      card.style.transform = [
        `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px)`,
        `rotateX(${rotateX}deg)`,
        `rotateY(${rotateY}deg)`,
        `rotateZ(${rotateZ}deg)`,
        `scale(${scale})`,
      ].join(" ");
    };

    const render = () => {
      frame = 0;

      if (motionPreference.matches) {
        root.dataset.motion = "static";
        root.dataset.phase = "hold";
        root.style.removeProperty("--projects-entry-out");
        root.style.removeProperty("--projects-final-meta");
        cards.forEach((card) => card.removeAttribute("style"));
        cardLinks.forEach((link) => link?.removeAttribute("tabindex"));
        return;
      }

      root.dataset.motion = "active";
      const progress = clamp((window.scrollY - sceneTop) / sceneDistance);
      const mobile = window.innerWidth <= 720;
      const entryOut = smoothstep(0.04, 0.22, progress);
      const finalMeta = smoothstep(0.7, 0.84, progress);
      const interactive = progress >= 0.8;

      root.dataset.phase = interactive
        ? "hold"
        : progress >= 0.3
          ? "projects"
          : "intro";
      root.style.setProperty("--projects-entry-out", entryOut.toFixed(4));
      root.style.setProperty("--projects-final-meta", finalMeta.toFixed(4));

      cards.forEach((card, index) => {
        const start = index === 0 ? 0.3 : 0.42;
        const end = index === 0 ? 0.62 : 0.74;
        const cardProgress = smoothstep(start, end, progress);
        setCardFrame(card, index, cardProgress, mobile);
        card.style.pointerEvents = interactive ? "auto" : "none";
        const link = cardLinks[index];
        if (link) link.tabIndex = interactive ? 0 : -1;
      });
    };

    const scheduleRender = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      const bounds = scene.getBoundingClientRect();
      sceneTop = bounds.top + window.scrollY;
      sceneDistance = Math.max(scene.offsetHeight - window.innerHeight, 1);
      scheduleRender();
    };

    const configure = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      root.dataset.motion = motionPreference.matches ? "static" : "active";
      measure();
      render();
    };

    configure();
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    motionPreference.addEventListener("change", configure);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", measure);
      motionPreference.removeEventListener("change", configure);
      cards.forEach((card) => card.removeAttribute("style"));
      cardLinks.forEach((link) => link?.removeAttribute("tabindex"));
      root.removeAttribute("data-motion");
      root.removeAttribute("data-phase");
    };
  }, []);

  return (
    <main className={styles.page}>
      <div ref={rootRef} className={styles.experience} data-motion="static" data-phase="hold">
        <section
          ref={sceneRef}
          className={styles.scene}
          aria-labelledby="projects-title"
          tabIndex={-1}
        >
          <div className={styles.stage} data-projects-stage>
            <header className={styles.intro}>
              <div className={styles.titleWrap}>
                <h1 id="projects-title" className={styles.editorialTitle} aria-label={statement}>
                  <span className={styles.editorialLine} aria-hidden="true">
                    {statementWords.map((word, index) => (
                      <span className={styles.editorialMask} key={`${word}-${index}`}>
                        <span
                          className={styles.editorialWord}
                          style={{ "--statement-index": index } as CSSProperties}
                        >
                          {word}
                        </span>
                      </span>
                    ))}
                  </span>
                </h1>
              </div>
              <p className={styles.scrollCue}>
                <span className={styles.scrollCueMask}>
                  <span className={styles.scrollCueText}>Scroll to see</span>
                </span>
              </p>
            </header>

            <ol className={styles.cards} aria-label="Selected projects">
              {portfolioProjects.map((project, index) => (
                <li
                  key={project.slug}
                  className={styles.cardItem}
                  data-project-card
                >
                  <TransitionLink
                    href={`/work/${project.slug}`}
                    transitionLabel={project.title}
                    className={styles.cardLink}
                    aria-label={`Open ${project.title} project`}
                  >
                    <article className={styles.card}>
                      <div className={styles.cardVisual}>
                        <Image
                          src={project.imageSrc}
                          alt={project.imageAlt}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 720px) 82vw, 42vw"
                          className={styles.cardImage}
                        />
                      </div>
                      <div className={styles.cardMeta}>
                        <div>
                          <p>{project.category}</p>
                          <h2>{project.title}</h2>
                        </div>
                        <span>{project.year} ↗</span>
                      </div>
                    </article>
                  </TransitionLink>
                </li>
              ))}
            </ol>

            <div className={styles.finalMeta}>
              <p>Selected projects</p>
              <p>More case studies will be added when they are ready.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
