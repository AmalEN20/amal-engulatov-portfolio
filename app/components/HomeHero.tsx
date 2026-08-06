"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { portfolioProjects } from "../work/projects";
import { AsciiPortrait } from "./AsciiPortrait";
import type { AboutFigureProgress } from "./AsciiPortrait";
import { TransitionLink } from "./SiteShell";
import styles from "./HomeHero.module.css";

type MotionState = "static" | "waiting" | "entered";

const PARTICLE_SCATTER_START = 0.025;
const PARTICLE_SCATTER_END = 0.525;
const IDENTITY_ERASE_END = 0.231;
const WORK_REVEAL_START = 0.605;
const WORK_SURFACE_END = 0.665;
const WORK_HEADING_START = 0.615;
const WORK_HEADING_END = 0.705;
const FIRST_CARD_START = 0.64;
const FIRST_CARD_END = 0.8;
const SECOND_CARD_START = 0.72;
const SECOND_CARD_END = 0.9;
const SECOND_CARD_COPY_START = 0.76;
const WORK_YEAR_START = SECOND_CARD_END;
const WORK_YEAR_END = 0.965;
const NAV_BRAND_REVEAL = 0.53;
const WORK_EXIT_START = 0.02;
const WORK_EXIT_END = 0.084;
const ABOUT_REVEAL_START = 0.096;
const ABOUT_REVEAL_END = 0.13;
const ABOUT_FIRST_ROW_START = 0.142;
const ABOUT_FIRST_ROW_END = 0.282;
const ABOUT_FIRST_WAVE_START = 0.282;
const ABOUT_FIRST_WAVE_END = 0.412;
const ABOUT_SECOND_ROW_START = 0.412;
const ABOUT_SECOND_ROW_END = 0.552;
const ABOUT_SECOND_WAVE_START = 0.552;
const ABOUT_SECOND_WAVE_END = 0.682;
const ABOUT_THIRD_ROW_START = 0.682;
const ABOUT_THIRD_ROW_END = 0.822;
const ABOUT_THIRD_WAVE_START = 0.822;
const ABOUT_THIRD_WAVE_END = 0.952;
const ABOUT_ASSEMBLY_DESKTOP_VH = 12.8;
const ABOUT_ASSEMBLY_MOBILE_VH = 10.2;
const ABOUT_EXIT_DESKTOP_VH = 3.5;
const ABOUT_EXIT_MOBILE_VH = 2.6;
const CONTACT_SURFACE_START = 0.76;
const CONTACT_SURFACE_END = 0.82;
const CONTACT_TITLE_START = 0.82;
const CONTACT_TITLE_END = 0.89;
const contactWords = ["If", "you", "wanna", "talk."];

const getSmoothProgress = (progress: number, start: number, end: number) => {
  const linear = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return linear * linear * (3 - 2 * linear);
};

const getLinearProgress = (progress: number, start: number, end: number) =>
  Math.min(1, Math.max(0, (progress - start) / (end - start)));

export function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const workSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const aboutFigureProgressRef = useRef<AboutFigureProgress>({
    clipBottom: 0,
    clipTop: 0,
    exit: 0,
    surface: 0,
    waveOne: 0,
    waveTwo: 0,
    waveThree: 0,
  });
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
    const workSection = workSectionRef.current;
    const aboutSection = aboutSectionRef.current;
    const contactSection = contactSectionRef.current;
    if (!hero || !workSection || !aboutSection || !contactSection) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const workCards = Array.from(
      workSection.querySelectorAll<HTMLElement>("[data-home-work-card]"),
    );
    const aboutBands = Array.from(
      aboutSection.querySelectorAll<HTMLElement>("[data-home-about-band]"),
    );

    const setCardAccessibility = (card: HTMLElement | undefined, visible: boolean) => {
      if (!card) return;
      card.inert = !visible;
      card.setAttribute("aria-hidden", visible ? "false" : "true");
    };

    const updateProgress = () => {
      if (motionQuery.matches) {
        progressRef.current = 0;
        hero.style.setProperty("--hero-progress", "0");
        hero.style.setProperty("--work-progress", "1");
        hero.style.setProperty("--work-heading-progress", "1");
        hero.style.setProperty("--card-one-progress", "1");
        hero.style.setProperty("--card-two-progress", "1");
        hero.style.setProperty("--work-copy-one-progress", "1");
        hero.style.setProperty("--work-copy-two-progress", "1");
        hero.style.setProperty("--work-year-progress", "1");
        hero.style.setProperty("--work-heading-exit", "0");
        hero.style.setProperty("--card-one-exit", "0");
        hero.style.setProperty("--card-two-exit", "0");
        hero.style.setProperty("--about-progress", "1");
        hero.style.setProperty("--about-row-one-progress", "1");
        hero.style.setProperty("--about-row-two-progress", "1");
        hero.style.setProperty("--about-row-three-progress", "1");
        hero.style.setProperty("--about-wave-one-progress", "1");
        hero.style.setProperty("--about-wave-two-progress", "1");
        hero.style.setProperty("--about-wave-three-progress", "1");
        hero.style.setProperty("--about-exit-progress", "0");
        hero.style.setProperty("--contact-progress", "1");
        hero.style.setProperty("--contact-title-progress", "1");
        aboutFigureProgressRef.current = {
          clipBottom: 0,
          clipTop: 0,
          exit: 0,
          surface: 0,
          waveOne: 0,
          waveTwo: 0,
          waveThree: 0,
        };
        hero.dataset.workActive = "false";
        hero.dataset.contactSequence = "visible";
        hero.dataset.particles = "idle";
        hero.dataset.erased = "false";
        document.documentElement.dataset.homeHero = "cleared";
        workSection.inert = false;
        workSection.setAttribute("aria-hidden", "false");
        aboutSection.inert = false;
        aboutSection.setAttribute("aria-hidden", "false");
        contactSection.inert = false;
        contactSection.setAttribute("aria-hidden", "false");
        aboutBands.forEach((band) => {
          band.inert = false;
          band.setAttribute("aria-hidden", "false");
        });
        workCards.forEach((card) => {
          setCardAccessibility(card, true);
        });
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const travelled = Math.max(0, -bounds.top);
      const entryTravel = window.innerWidth <= 720
        ? window.innerHeight * 3
        : window.innerHeight * 4.2;
      const isNarrow = window.innerWidth <= 720;
      const assemblyTravel = window.innerHeight * (
        isNarrow ? ABOUT_ASSEMBLY_MOBILE_VH : ABOUT_ASSEMBLY_DESKTOP_VH
      );
      const aboutExitTravel = window.innerHeight * (
        isNarrow ? ABOUT_EXIT_MOBILE_VH : ABOUT_EXIT_DESKTOP_VH
      );
      const progress = Math.min(1, Math.max(0, travelled / entryTravel));
      const exitProgress = Math.min(
        1,
        Math.max(0, (travelled - entryTravel) / assemblyTravel),
      );
      const aboutExitProgress = Math.min(
        1,
        Math.max(
          0,
          (travelled - entryTravel - assemblyTravel) / aboutExitTravel,
        ),
      );
      const contactProgress = getSmoothProgress(
        aboutExitProgress,
        CONTACT_SURFACE_START,
        CONTACT_SURFACE_END,
      );
      const contactTitleProgress = getSmoothProgress(
        aboutExitProgress,
        CONTACT_TITLE_START,
        CONTACT_TITLE_END,
      );
      const workProgress = getSmoothProgress(
        progress,
        WORK_REVEAL_START,
        WORK_SURFACE_END,
      );
      const workHeadingProgress = getSmoothProgress(
        progress,
        WORK_HEADING_START,
        WORK_HEADING_END,
      );
      const firstCardProgress = getSmoothProgress(
        progress,
        FIRST_CARD_START,
        FIRST_CARD_END,
      );
      const secondCardProgress = getSmoothProgress(
        progress,
        SECOND_CARD_START,
        SECOND_CARD_END,
      );
      const workCopyOneProgress = getLinearProgress(
        progress,
        SECOND_CARD_START,
        SECOND_CARD_END,
      );
      const workCopyTwoProgress = getLinearProgress(
        progress,
        SECOND_CARD_COPY_START,
        SECOND_CARD_END,
      );
      const workYearProgress = getSmoothProgress(
        progress,
        WORK_YEAR_START,
        WORK_YEAR_END,
      );
      const workHeadingExit = getSmoothProgress(
        exitProgress,
        WORK_EXIT_START,
        WORK_EXIT_END,
      );
      const firstCardExit = getSmoothProgress(
        exitProgress,
        WORK_EXIT_START,
        WORK_EXIT_END,
      );
      const secondCardExit = getSmoothProgress(
        exitProgress,
        WORK_EXIT_START,
        WORK_EXIT_END,
      );
      const aboutProgress = getSmoothProgress(
        exitProgress,
        ABOUT_REVEAL_START,
        ABOUT_REVEAL_END,
      );
      const aboutFirstRowProgress = getSmoothProgress(
        exitProgress,
        ABOUT_FIRST_ROW_START,
        ABOUT_FIRST_ROW_END,
      );
      const aboutSecondRowProgress = getSmoothProgress(
        exitProgress,
        ABOUT_SECOND_ROW_START,
        ABOUT_SECOND_ROW_END,
      );
      const aboutFirstWaveProgress = getLinearProgress(
        exitProgress,
        ABOUT_FIRST_WAVE_START,
        ABOUT_FIRST_WAVE_END,
      );
      const aboutSecondWaveProgress = getLinearProgress(
        exitProgress,
        ABOUT_SECOND_WAVE_START,
        ABOUT_SECOND_WAVE_END,
      );
      const aboutThirdRowProgress = getSmoothProgress(
        exitProgress,
        ABOUT_THIRD_ROW_START,
        ABOUT_THIRD_ROW_END,
      );
      const aboutThirdWaveProgress = getLinearProgress(
        exitProgress,
        ABOUT_THIRD_WAVE_START,
        ABOUT_THIRD_WAVE_END,
      );

      progressRef.current = progress;
      hero.style.setProperty("--hero-progress", progress.toFixed(4));
      hero.style.setProperty("--work-progress", workProgress.toFixed(4));
      hero.style.setProperty("--work-heading-progress", workHeadingProgress.toFixed(4));
      hero.style.setProperty("--card-one-progress", firstCardProgress.toFixed(4));
      hero.style.setProperty("--card-two-progress", secondCardProgress.toFixed(4));
      hero.style.setProperty(
        "--work-copy-one-progress",
        workCopyOneProgress.toFixed(4),
      );
      hero.style.setProperty(
        "--work-copy-two-progress",
        workCopyTwoProgress.toFixed(4),
      );
      hero.style.setProperty("--work-year-progress", workYearProgress.toFixed(4));
      hero.style.setProperty("--work-heading-exit", workHeadingExit.toFixed(4));
      hero.style.setProperty("--card-one-exit", firstCardExit.toFixed(4));
      hero.style.setProperty("--card-two-exit", secondCardExit.toFixed(4));
      hero.style.setProperty("--about-progress", aboutProgress.toFixed(4));
      hero.style.setProperty(
        "--about-row-one-progress",
        aboutFirstRowProgress.toFixed(4),
      );
      hero.style.setProperty(
        "--about-row-two-progress",
        aboutSecondRowProgress.toFixed(4),
      );
      hero.style.setProperty(
        "--about-row-three-progress",
        aboutThirdRowProgress.toFixed(4),
      );
      hero.style.setProperty(
        "--about-wave-one-progress",
        aboutFirstWaveProgress.toFixed(4),
      );
      hero.style.setProperty(
        "--about-wave-two-progress",
        aboutSecondWaveProgress.toFixed(4),
      );
      hero.style.setProperty(
        "--about-wave-three-progress",
        aboutThirdWaveProgress.toFixed(4),
      );
      hero.style.setProperty("--about-exit-progress", aboutExitProgress.toFixed(4));
      hero.style.setProperty("--contact-progress", contactProgress.toFixed(4));
      hero.style.setProperty(
        "--contact-title-progress",
        contactTitleProgress.toFixed(4),
      );
      const aboutBounds = aboutSection.getBoundingClientRect();
      const aboutClipTop = Math.min(window.innerHeight, Math.max(0, aboutBounds.top));
      const aboutClipBottom = Math.min(
        window.innerHeight,
        Math.max(0, aboutBounds.bottom),
      );
      aboutFigureProgressRef.current = {
        clipBottom: aboutClipBottom,
        clipTop: aboutClipTop,
        exit: aboutExitProgress,
        surface: aboutClipBottom > aboutClipTop ? aboutProgress : 0,
        waveOne: aboutFirstWaveProgress,
        waveTwo: aboutSecondWaveProgress,
        waveThree: aboutThirdWaveProgress,
      };
      hero.dataset.workActive =
        progress >= WORK_REVEAL_START && secondCardExit < 0.98 && bounds.bottom > 0
          ? "true"
          : "false";
      if (contactTitleProgress >= 0.995) {
        hero.dataset.contactSequence = "visible";
      } else if (contactTitleProgress <= 0.96) {
        hero.dataset.contactSequence = "hidden";
      }
      hero.dataset.particles =
        progress >= PARTICLE_SCATTER_START && progress < PARTICLE_SCATTER_END
          ? "active"
          : "idle";
      hero.dataset.erased = progress >= IDENTITY_ERASE_END ? "true" : "false";
      document.documentElement.dataset.homeHero =
        progress >= NAV_BRAND_REVEAL
          ? "cleared"
          : progress > 0.05
            ? "exiting"
            : "intro";

      const sectionVisible = progress >= WORK_REVEAL_START && secondCardExit < 0.72;
      workSection.inert = !sectionVisible;
      workSection.setAttribute("aria-hidden", sectionVisible ? "false" : "true");
      setCardAccessibility(
        workCards[0],
        firstCardProgress >= 0.55 && firstCardExit < 0.55,
      );
      setCardAccessibility(
        workCards[1],
        secondCardProgress >= 0.55 && secondCardExit < 0.55,
      );
      const aboutVisible = aboutFirstRowProgress >= 0.25 && aboutExitProgress < 0.78;
      aboutSection.inert = !aboutVisible;
      aboutSection.setAttribute("aria-hidden", aboutVisible ? "false" : "true");
      [aboutFirstRowProgress, aboutSecondRowProgress, aboutThirdRowProgress].forEach(
        (rowProgress, index) => {
          const band = aboutBands[index];
          if (!band) return;
          const bandVisible = rowProgress >= 0.45 && aboutExitProgress < 0.72;
          band.inert = !bandVisible;
          band.setAttribute("aria-hidden", bandVisible ? "false" : "true");
        },
      );
      const contactVisible = contactTitleProgress >= 0.995;
      contactSection.inert = !contactVisible;
      contactSection.setAttribute("aria-hidden", contactVisible ? "false" : "true");
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
    <>
      <div
        ref={heroRef}
        className={styles.hero}
        data-erased="false"
        data-motion={motionState}
        data-particles="idle"
        style={
          {
            "--hero-progress": 0,
            "--work-progress": 0,
            "--work-heading-progress": 0,
            "--card-one-progress": 0,
            "--card-two-progress": 0,
            "--work-heading-exit": 0,
            "--card-one-exit": 0,
            "--card-two-exit": 0,
            "--about-progress": 0,
            "--about-row-one-progress": 0,
            "--about-row-two-progress": 0,
            "--about-row-three-progress": 0,
            "--about-wave-one-progress": 0,
            "--about-wave-two-progress": 0,
            "--about-wave-three-progress": 0,
            "--about-exit-progress": 0,
            "--contact-progress": 0,
            "--contact-title-progress": 0,
          } as CSSProperties
        }
        data-contact-sequence="hidden"
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
                <span className={styles.titleWord}>
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

          <AsciiPortrait
            aboutProgressRef={aboutFigureProgressRef}
            className={styles.portrait}
            scrollProgressRef={progressRef}
          />

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

          <section
            ref={workSectionRef}
            className={styles.workArrival}
            id="work"
            aria-labelledby="home-work-title"
          >
            <div className={styles.workHeadingReveal}>
              <h2 className={styles.workHeading} id="home-work-title">
                What I’ve been working on lately.
              </h2>
              <span className={styles.workHeadingCurtain} aria-hidden="true" />
            </div>

            <div className={styles.workList}>
              {portfolioProjects.map((project, index) => (
                <article
                  className={styles.projectCard}
                  data-home-work-card
                  data-project={project.slug}
                  key={project.slug}
                  style={
                    {
                      "--card-progress": `var(--card-${index === 0 ? "one" : "two"}-progress)`,
                      "--copy-progress": `var(--work-copy-${index === 0 ? "one" : "two"}-progress, 1)`,
                    } as CSSProperties
                  }
                >
                  <TransitionLink
                    className={styles.projectLink}
                    href={`/work/${project.slug}`}
                    transitionLabel={project.title}
                    aria-label={`View ${project.title} case study`}
                  >
                    <div className={styles.projectMedia}>
                      {project.slug === "evele-studio" ? (
                        <span className={styles.eveleArtwork} aria-hidden="true">
                          <span className={styles.projectWordmark}>EVELE</span>
                        </span>
                      ) : (
                        <span className={styles.aiArtwork} aria-hidden="true">
                          <span
                            className={`${styles.projectWordmark} ${styles.aiWordmark}`}
                          >
                            AMAL AI
                          </span>
                        </span>
                      )}
                    </div>

                    <div className={styles.projectCopy}>
                      <div className={styles.projectRevealMask}>
                        <div
                          className={`${styles.projectMeta} ${styles.projectRevealBlock}`}
                          style={{ "--detail-index": 0 } as CSSProperties}
                        >
                          <span>{project.category}</span>
                          <span className={styles.projectYear}>{project.year}</span>
                        </div>
                      </div>
                      <div className={`${styles.projectRevealMask} ${styles.projectBodyMask}`}>
                        <div className={styles.projectBody}>
                          <div className={styles.projectRevealMask}>
                            <h3
                              className={styles.projectRevealBlock}
                              style={{ "--detail-index": 1 } as CSSProperties}
                            >
                              {project.title}
                            </h3>
                          </div>
                          <div className={styles.projectRevealMask}>
                            <p
                              className={styles.projectRevealBlock}
                              style={{ "--detail-index": 2 } as CSSProperties}
                            >
                              {project.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={styles.projectRevealMask}>
                        <span
                          className={`${styles.projectCta} ${styles.projectRevealBlock}`}
                          style={{ "--detail-index": 3 } as CSSProperties}
                        >
                          View case study
                          <span aria-hidden="true">↗</span>
                        </span>
                      </div>
                    </div>
                  </TransitionLink>
                  <span className={styles.projectCurtain} aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section
            ref={aboutSectionRef}
            className={styles.aboutArrival}
            id="about"
            aria-labelledby="home-about-title"
          >
            <h2 className={styles.visuallyHidden} id="home-about-title">
              About
            </h2>

            <div className={styles.aboutBands}>
              <section
                className={styles.aboutBand}
                aria-labelledby="home-about-availability"
                data-home-about-band
                style={
                  {
                    "--about-row-progress": "var(--about-row-one-progress)",
                    "--about-wave-progress": "var(--about-wave-one-progress)",
                  } as CSSProperties
                }
              >
                <div className={styles.aboutBandInner}>
                  <span className={styles.aboutLabel} data-about-particle-erase>
                    Open to
                  </span>
                  <h3 id="home-about-availability" data-about-particle-erase>
                    Full-time, part-time, or project by project.
                  </h3>
                  <div className={styles.aboutCopyRow}>
                    <p data-about-particle-erase>
                      I’m open to joining a team, collaborating on a focused
                      engagement, or taking a product from idea to launch
                      independently.
                    </p>
                    <span
                      className={styles.aboutEmitterSlot}
                      data-about-particle-source
                      aria-hidden="true"
                    >
                      <span className={styles.aboutEmitterLine} />
                    </span>
                  </div>
                </div>
                <span className={styles.aboutBandCurtain} aria-hidden="true" />
              </section>

              <section
                className={styles.aboutBand}
                aria-labelledby="home-about-curiosity"
                data-home-about-band
                style={
                  {
                    "--about-row-progress": "var(--about-row-two-progress)",
                    "--about-wave-progress": "var(--about-wave-two-progress)",
                  } as CSSProperties
                }
              >
                <div className={styles.aboutBandInner}>
                  <span className={styles.aboutLabel} data-about-particle-erase>
                    Curiosity
                  </span>
                  <h3 id="home-about-curiosity" data-about-particle-erase>
                    I like making new things.
                  </h3>
                  <div className={styles.aboutCopyRow}>
                    <p data-about-particle-erase>
                      Building is what I’m focused on. If the work asks me to
                      learn something new, that makes it more interesting—not
                      less.
                    </p>
                    <span
                      className={styles.aboutEmitterSlot}
                      data-about-particle-source
                      aria-hidden="true"
                    >
                      <span className={styles.aboutEmitterLine} />
                    </span>
                  </div>
                </div>
                <span className={styles.aboutBandCurtain} aria-hidden="true" />
              </section>

              <section
                className={styles.aboutBand}
                aria-labelledby="home-about-approach"
                data-home-about-band
                style={
                  {
                    "--about-row-progress": "var(--about-row-three-progress)",
                    "--about-wave-progress": "var(--about-wave-three-progress)",
                  } as CSSProperties
                }
              >
                <div className={styles.aboutBandInner}>
                  <span className={styles.aboutLabel} data-about-particle-erase>
                    Approach
                  </span>
                  <h3 id="home-about-approach" data-about-particle-erase>
                    Clean interfaces, with room to experiment.
                  </h3>
                  <div className={styles.aboutCopyRow}>
                    <p data-about-particle-erase>
                      I care about thoughtful, beautiful systems, but I’m always
                      ready to test a less obvious direction when the product
                      calls for it.
                    </p>
                    <span
                      className={styles.aboutEmitterSlot}
                      data-about-particle-source
                      aria-hidden="true"
                    >
                      <span className={styles.aboutEmitterLine} />
                    </span>
                  </div>
                </div>
                <span className={styles.aboutBandCurtain} aria-hidden="true" />
              </section>
            </div>
          </section>

          <section
            ref={contactSectionRef}
            className={styles.contactArrival}
            id="contact"
            aria-labelledby="home-contact-title"
          >
            <div className={styles.contactInner}>
              <div className={styles.contactTitleMask}>
                <h2 id="home-contact-title" aria-label="If you wanna talk.">
                  <span className={styles.contactTitleWords} aria-hidden="true">
                    {contactWords.map((word, index) => (
                      <span className={styles.contactTitleWordMask} key={word}>
                        <span
                          className={styles.contactTitleWord}
                          style={{ "--contact-word-index": index } as CSSProperties}
                        >
                          {word}
                        </span>
                      </span>
                    ))}
                  </span>
                </h2>
              </div>
              <span className={styles.contactConnector} aria-hidden="true" />
              <span className={styles.contactLinkMask}>
                <TransitionLink
                  className={styles.contactLink}
                  href="/contact"
                  transitionLabel="Contact"
                >
                  Let’s talk
                </TransitionLink>
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
