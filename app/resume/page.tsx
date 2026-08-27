import type { Metadata } from "next";
import Link from "next/link";
import { portfolioContent } from "../content/portfolio";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume for Amal E, a full-stack developer and digital product builder.",
};

export default function ResumePage() {
  const { identity, experience, projects, education, links } = portfolioContent;

  return (
    <>
      <a className="skip-link" href="#resume-content">
        Skip to resume
      </a>
      <main className="utility-page resume-page" id="resume-content">
        <Link className="utility-back" href="/">
          ← Portfolio
        </Link>

        <header className="utility-header resume-header">
          <p className="resume-kicker">Resume</p>
          <h1>{identity.name}</h1>
          <p>{identity.role}</p>
          <span>{identity.location}</span>
        </header>

        <section className="resume-section" aria-labelledby="resume-profile-title">
          <h2 id="resume-profile-title">Profile</h2>
          <div className="resume-copy">
            {identity.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="resume-section" aria-labelledby="resume-experience-title">
          <h2 id="resume-experience-title">Experience</h2>
          <ul className="entry-list detail-list">
            {experience.map((item) => (
              <li key={`${item.organization}-${item.role}`}>
                <div className="entry-row">
                  <span>
                    <strong>{item.organization}</strong>
                    <small>{item.role}</small>
                    <small>{item.description}</small>
                  </span>
                  <span className="entry-meta">
                    {item.period}
                    <br />
                    {item.location}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section" aria-labelledby="resume-projects-title">
          <h2 id="resume-projects-title">Projects</h2>
          <ul className="entry-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <div className="entry-row">
                  <span>
                    <strong>{project.title}</strong>
                    <small>{project.category}</small>
                  </span>
                  <span className="entry-meta">{project.year}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section" aria-labelledby="resume-education-title">
          <h2 id="resume-education-title">Education</h2>
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

        <footer className="resume-footer">
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </main>
    </>
  );
}
