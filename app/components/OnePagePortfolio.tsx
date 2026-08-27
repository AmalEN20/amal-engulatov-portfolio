import { portfolioContent } from "../content/portfolio";
import { AsciiPortrait } from "./AsciiPortrait";
import { ProjectDialog } from "./ProjectDialog";

export type PortfolioTypeStyle = "geist" | "instrument" | "plex";

export function OnePagePortfolio({ typeStyle = "instrument" }: { typeStyle?: PortfolioTypeStyle }) {
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
              <h1>{identity.name}</h1>
              <div className="profile-meta">
                <p>{identity.role}</p>
                <span>{identity.location}</span>
              </div>
            </header>
            <div className="intro-copy">
              {identity.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="portfolio-section" id="experience" aria-labelledby="experience-title">
            <h2 id="experience-title">Experience</h2>
            <ul className="entry-list experience-list">
              {experience.map((item) => (
                <li key={`${item.organization}-${item.role}`}>
                  <article className="experience-entry">
                    <div
                      className={`experience-title-row${
                        item.organization !== "Independent" ? " experience-title-row-with-company" : ""
                      }`}
                    >
                      <h3>{item.role}</h3>
                      {item.organization !== "Independent" ? (
                        <p className="experience-company">{item.organization}</p>
                      ) : null}
                    </div>
                    <p className="experience-period">
                      {item.period} · {item.location}
                    </p>
                    <p className="experience-description">{item.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          <section className="portfolio-section" id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title">Projects</h2>
            <ul className="entry-list">
              {projects.map((project) => (
                <li id={`project-${project.slug}`} key={project.slug}>
                  <ProjectDialog project={project}>
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.category}</small>
                    </span>
                    <span className="entry-meta">{project.year} · Open</span>
                  </ProjectDialog>
                </li>
              ))}
            </ul>
          </section>

          <section className="portfolio-section" id="education" aria-labelledby="education-title">
            <h2 id="education-title">Education</h2>
            <ul className="entry-list detail-list">
              {education.map((item) => (
                <li key={`${item.institution}-${item.credential}`}>
                  <div className="entry-row">
                    <span>
                      <strong>{item.institution}</strong>
                      <small>{item.credential}</small>
                    </span>
                    <span className="entry-meta">{item.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <footer className="site-footer">
            <nav aria-label="Portfolio links">
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn, opens in a new tab">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub, opens in a new tab">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a
                href="/Amal-I-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Resume PDF, opens in a new tab"
              >
                Resume <span aria-hidden="true">↗</span>
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
