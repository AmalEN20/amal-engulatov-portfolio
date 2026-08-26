import type { CSSProperties } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { portfolioContent } from "../content/portfolio";
import { AsciiPortrait } from "./AsciiPortrait";

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

export function OnePagePortfolio() {
  const { identity, notes, projects, experiments, links } = portfolioContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <main className="portfolio-page" id="main-content">
        <article className="home-copy">
          <header className="profile-header">
            <h1 aria-label={identity.name}>
              <MaskedWords delay={110} text={identity.name} />
            </h1>
            <p className="block-mask">
              <span className="reveal-block silver-detail" style={motionStyle(390)}>
                {identity.role}
              </span>
            </p>
          </header>

          <section className="bio-section" id="bio" aria-labelledby="bio-title">
            <div className="bio-label-row" style={motionStyle(500, 440)}>
              <h2 id="bio-title" aria-label="Bio">
                <MaskedWords delay={500} text="Bio" />
              </h2>
              <span className="block-mask">
                <span className="reveal-block silver-detail" style={motionStyle(560)}>
                  {identity.location}
                </span>
              </span>
            </div>
            <div className="bio-copy">
              {identity.bio.map((paragraph, index) => (
                <p className="block-mask" key={paragraph}>
                  <span className="reveal-block" style={motionStyle(630 + index * 120)}>
                    {paragraph}
                  </span>
                </p>
              ))}
              <p className="availability entry-reveal" style={motionStyle(880)}>
                <span className="availability-dot" aria-hidden="true" />
                {identity.availability}
              </p>
            </div>
          </section>

          <section className="portfolio-section" id="notes" aria-labelledby="notes-title">
            <h2 id="notes-title" aria-label="Notes">
              <MaskedWords delay={960} text="Notes" />
            </h2>
            <ul className="notes-list">
              {notes.map((note, index) => (
                <li key={note}>
                  <span className="block-mask">
                    <span className="reveal-block" style={motionStyle(1050 + index * 65)}>
                      {note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="portfolio-section" id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title" aria-label="Projects">
              <MaskedWords delay={1220} text="Projects" />
            </h2>
            <ul className="entry-list" style={motionStyle(1280, 1190)}>
              {projects.map((project, index) => (
                <li
                  id={`project-${project.slug}`}
                  key={project.slug}
                  style={motionStyle(1320 + index * 110, 1260 + index * 100)}
                >
                  {project.repositoryUrl ? (
                    <a
                      className="entry-row entry-reveal"
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>
                        <strong>{project.title}</strong>
                        <small>{project.category}</small>
                      </span>
                      <span className="entry-meta">
                        {project.year} <span aria-hidden="true">↗</span>
                      </span>
                    </a>
                  ) : (
                    <div className="entry-row entry-reveal">
                      <span>
                        <strong>{project.title}</strong>
                        <small>{project.category}</small>
                      </span>
                      <span className="entry-meta">{project.year} · Private</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="portfolio-section" id="experiments" aria-labelledby="experiments-title">
            <h2 id="experiments-title" aria-label="Experiments">
              <MaskedWords delay={1500} text="Experiments" />
            </h2>
            <ul className="entry-list experiment-list" style={motionStyle(1560, 1470)}>
              {experiments.map((experiment, index) => (
                <li
                  key={experiment.title}
                  style={motionStyle(1600 + index * 90, 1540 + index * 90)}
                >
                  <div className="entry-row entry-reveal">
                    <span>
                      <strong>{experiment.title}</strong>
                      <small>{experiment.description}</small>
                    </span>
                    <span className="entry-meta">{experiment.area}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <footer className="site-footer entry-reveal" style={motionStyle(1900, 1810)}>
            <span>{identity.name}</span>
            <nav aria-label="Portfolio links">
              <a href={links.github} target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <Link href="/contact">Contact</Link>
              <a href="#main-content">Top</a>
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
