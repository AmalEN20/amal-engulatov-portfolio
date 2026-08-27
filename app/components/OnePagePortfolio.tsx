import type { CSSProperties } from "react";
import { Fragment } from "react";
import { portfolioContent } from "../content/portfolio";
import { AsciiPortrait } from "./AsciiPortrait";
import { ProjectDialog } from "./ProjectDialog";

const motionStyle = (revealDelay: number, lineDelay = revealDelay) =>
  ({
    "--line-delay": `${lineDelay}ms`,
    "--reveal-delay": `${revealDelay}ms`,
  } as CSSProperties);

function MaskedWords({ text, delay }: { text: string; delay: number }) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="word-mask" aria-hidden="true">
        <span className="reveal-word" style={motionStyle(delay + index * 90)}>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

function MaskedCopy({
  text,
  delay,
  stagger = 24,
}: {
  text: string;
  delay: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="copy-word-mask" aria-hidden="true">
        <span className="reveal-copy-word" style={motionStyle(delay + index * stagger)}>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export type PortfolioTypeStyle = "geist" | "instrument" | "plex";

export function OnePagePortfolio({ typeStyle = "geist" }: { typeStyle?: PortfolioTypeStyle }) {
  const { identity, experience, projects, education, links } = portfolioContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <main className="portfolio-page" data-type-style={typeStyle} id="main-content">
        <article className="home-copy">
          <section className="intro-section" id="bio" aria-label="Introduction">
            <header className="profile-header">
              <h1 aria-label={identity.name}>
                <MaskedWords delay={110} text={identity.name} />
              </h1>
              <div className="profile-meta" style={motionStyle(340, 410)}>
                <p aria-label={identity.role}>
                  <MaskedCopy delay={310} stagger={26} text={identity.role} />
                </p>
                <span aria-label={identity.location}>
                  <MaskedCopy delay={390} text={identity.location} />
                </span>
              </div>
            </header>
            <div className="intro-copy">
              {identity.bio.map((paragraph, index) => (
                <p aria-label={paragraph} key={paragraph}>
                  <MaskedCopy delay={510 + index * 170} text={paragraph} />
                </p>
              ))}
            </div>
          </section>

          <section className="portfolio-section" id="experience" aria-labelledby="experience-title">
            <h2 id="experience-title" aria-label="Experience">
              <MaskedWords delay={880} text="Experience" />
            </h2>
            <ul className="entry-list experience-list" style={motionStyle(940, 850)}>
              {experience.map((item, index) => (
                <li
                  key={`${item.organization}-${item.role}`}
                  style={motionStyle(960 + index * 130, 920 + index * 120)}
                >
                  <article className="experience-entry">
                    <div className="experience-title-row">
                      <h3 aria-label={item.role}>
                        <MaskedCopy delay={960 + index * 130} text={item.role} />
                      </h3>
                      {item.organization !== "Independent" ? (
                        <p className="experience-company" aria-label={item.organization}>
                          <MaskedCopy delay={1010 + index * 130} text={item.organization} />
                        </p>
                      ) : null}
                    </div>
                    <p
                      className="experience-period"
                      aria-label={`${item.period}, ${item.location}`}
                    >
                      <MaskedCopy
                        delay={1060 + index * 130}
                        text={`${item.period} · ${item.location}`}
                      />
                    </p>
                    <p className="experience-description" aria-label={item.description}>
                      <MaskedCopy delay={1110 + index * 130} stagger={19} text={item.description} />
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section className="portfolio-section" id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title" aria-label="Projects">
              <MaskedWords delay={1260} text="Projects" />
            </h2>
            <ul className="entry-list" style={motionStyle(1320, 1230)}>
              {projects.map((project, index) => (
                <li
                  id={`project-${project.slug}`}
                  key={project.slug}
                  style={motionStyle(1340 + index * 130, 1300 + index * 120)}
                >
                  <ProjectDialog project={project}>
                    <span>
                      <strong>
                        <MaskedCopy delay={1340 + index * 130} text={project.title} />
                      </strong>
                      <small>
                        <MaskedCopy delay={1400 + index * 130} text={project.category} />
                      </small>
                    </span>
                    <span className="entry-meta">
                      <MaskedCopy delay={1380 + index * 130} text={`${project.year} · Open`} />
                    </span>
                  </ProjectDialog>
                </li>
              ))}
            </ul>
          </section>

          <section className="portfolio-section" id="education" aria-labelledby="education-title">
            <h2 id="education-title" aria-label="Education">
              <MaskedWords delay={1540} text="Education" />
            </h2>
            <ul className="entry-list detail-list" style={motionStyle(1600, 1510)}>
              {education.map((item, index) => (
                <li
                  key={`${item.institution}-${item.credential}`}
                  style={motionStyle(1620 + index * 90, 1580 + index * 90)}
                >
                  <div className="entry-row">
                    <span>
                      <strong aria-label={item.institution}>
                        <MaskedCopy delay={1620 + index * 90} text={item.institution} />
                      </strong>
                      <small aria-label={item.credential}>
                        <MaskedCopy delay={1680 + index * 90} text={item.credential} />
                      </small>
                    </span>
                    <span className="entry-meta" aria-label={item.status}>
                      <MaskedCopy delay={1660 + index * 90} text={item.status} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <footer className="site-footer">
            <nav aria-label="Portfolio links">
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn, opens in a new tab">
                <MaskedCopy delay={1900} text="LinkedIn" /> <span aria-hidden="true">↗</span>
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub, opens in a new tab">
                <MaskedCopy delay={1960} text="GitHub" /> <span aria-hidden="true">↗</span>
              </a>
              <a
                href="/Amal-I-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Resume PDF, opens in a new tab"
              >
                <MaskedCopy delay={2020} text="Resume" /> <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </footer>
        </article>

        <aside className="home-visual">
          <AsciiPortrait className="pixel-portrait" embedded />
        </aside>
      </main>
    </>
  );
}
