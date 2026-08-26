import type { CSSProperties } from "react";
import { portfolioContent } from "../content/portfolio";
import { ContactForm } from "./ContactForm";

const introOrder = (order: number) =>
  ({ "--intro-order": order } as CSSProperties);

export function OnePagePortfolio() {
  const { identity, navigation, projects, capabilities, education, links } = portfolioContent;
  const [firstName, ...lastName] = identity.name.split(" ");

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <main className="portfolio-page" id="main-content">
        <header className="identity-block" aria-labelledby="portfolio-title">
          <p className="eyebrow intro-block" style={introOrder(0)}>
            {identity.location}
          </p>

          <h1 className="identity-name" id="portfolio-title" aria-label={identity.name}>
            <span className="word-mask" aria-hidden="true">
              <span className="intro-word" style={introOrder(1)}>
                {firstName}
              </span>
            </span>{" "}
            <span className="word-mask" aria-hidden="true">
              <span className="intro-word" style={introOrder(2)}>
                {lastName.join(" ")}
              </span>
            </span>
          </h1>

          <p className="identity-role intro-block" style={introOrder(3)}>
            {identity.role}
          </p>
          <p className="identity-bio intro-block" style={introOrder(4)}>
            {identity.bio}
          </p>
          <p className="availability intro-block" style={introOrder(5)}>
            <span className="availability-dot" aria-hidden="true" />
            {identity.availability}
          </p>

          <nav className="anchor-nav intro-block" aria-label="Page sections" style={introOrder(6)}>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="intro-divider" style={introOrder(7)} aria-hidden="true" />
        </header>

        <section className="portfolio-section" id="selected-work" aria-labelledby="work-title">
          <div className="section-heading scroll-reveal">
            <p className="eyebrow">01 / Selected</p>
            <h2 id="work-title">Selected Work</h2>
          </div>

          <ol className="project-list">
            {projects.map((project, index) => (
              <li className="project-row scroll-reveal" id={`work-${project.slug}`} key={project.slug}>
                <article>
                  <div className="project-heading">
                    <span className="row-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{project.title}</h3>
                      <p className="project-responsibility">{project.responsibility}</p>
                    </div>
                    <span className="source-status">{project.sourceStatus}</span>
                  </div>

                  <p className="project-summary">{project.summary}</p>
                  <p className="project-description">{project.description}</p>

                  <div className="project-footer">
                    <ul className="stack-list" aria-label={`${project.title} technologies`}>
                      {project.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>

                    {project.repositoryUrl ? (
                      <a
                        className="text-link project-action"
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View source <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span className="project-private">Source available privately</span>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="portfolio-section" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading scroll-reveal">
            <p className="eyebrow">02 / Practice</p>
            <h2 id="capabilities-title">Capabilities</h2>
          </div>

          <ul className="capability-list">
            {capabilities.map((capability, index) => (
              <li className="information-row scroll-reveal" key={capability.title}>
                <span className="row-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="portfolio-section" id="background" aria-labelledby="background-title">
          <div className="section-heading scroll-reveal">
            <p className="eyebrow">03 / Background</p>
            <h2 id="background-title">Education</h2>
          </div>

          <ul className="education-list">
            {education.map((item) => (
              <li className="education-row scroll-reveal" key={item.institution}>
                <h3>{item.institution}</h3>
                <p>{item.credential}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="portfolio-section connect-section" id="connect" aria-labelledby="connect-title">
          <div className="section-heading scroll-reveal">
            <p className="eyebrow">04 / Contact</p>
            <h2 id="connect-title">Connect</h2>
          </div>

          <div className="connect-intro scroll-reveal">
            <p>
              For frontend or full-stack opportunities, share the role, product, or problem you are working on.
            </p>
            <a className="text-link" href={links.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="scroll-reveal">
            <ContactForm />
          </div>
        </section>

        <footer className="site-footer">
          <span>Amal Engulatov</span>
          <a href="#main-content">Back to top</a>
        </footer>
      </main>
    </>
  );
}
