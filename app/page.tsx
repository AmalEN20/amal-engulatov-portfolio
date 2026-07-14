import { ProjectVisual } from "./components/ProjectVisual";
import { TransitionLink } from "./components/SiteShell";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-kinetic" aria-hidden="true">
          <span className="signal-track signal-track-one"><i /><i /></span>
          <span className="signal-track signal-track-two"><i /><i /></span>
          <span className="signal-track signal-track-three"><i /></span>
          <b className="signal-core">AI</b>
          <small className="signal-label signal-context">Context</small>
          <small className="signal-label signal-reason">Reason</small>
          <small className="signal-label signal-action">Action</small>
        </div>
        <div className="container-shell home-hero-inner">
          <div className="hero-topline reveal-line">
            <span className="eyebrow">AI Software Engineer · Seattle, WA</span>
            <span className="status"><i /> Open to opportunities</span>
          </div>
          <h1 className="display-title">
            <span className="line-mask"><span>Amal</span></span>
            <span className="line-mask"><span>Engulatov—</span></span>
          </h1>
          <div className="hero-summary reveal-up">
            <span className="eyebrow">Scroll to explore ↓</span>
            <p>I build AI agents and intelligent products that make complicated work feel simple.</p>
          </div>
        </div>
      </section>

      <section className="intro-section">
        <div className="container-shell intro-grid reveal-up">
          <div className="intro-topline">
            <span className="eyebrow">What I do</span>
            <span className="eyebrow">Product thinking · Engineering · Applied AI</span>
          </div>
          <p className="intro-copy">I turn complex ideas into intelligent products people can understand, trust, and actually use.</p>
          <div className="intro-bottomline">
            <p>From defining the real problem to engineering the working system, I build across the complete product experience.</p>
            <TransitionLink className="text-link" href="/about">More about me <span>↗</span></TransitionLink>
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="container-shell">
          <div className="section-head reveal-up">
            <div><span className="eyebrow">Selected projects</span><h2>Projects with purpose.</h2></div>
            <span className="eyebrow">01 — {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <TransitionLink className="project-row reveal-up" href={`/work/${project.slug}`} transitionLabel={project.title} key={project.slug}>
                <span className="project-number">0{index + 1}</span>
                <div className="project-row-copy">
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
                <ProjectVisual variant={project.variant} compact imageSrc={project.image} imageAlt={`${project.title} case study interface`} />
                <span className="row-arrow">↗</span>
              </TransitionLink>
            ))}
          </div>
          <div className="section-action"><TransitionLink className="pill-link" href="/work">View all projects <span>↗</span></TransitionLink></div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-shell">
          <span className="eyebrow">Have a project or opportunity?</span>
          <h2>Let’s make something <em>useful.</em></h2>
          <TransitionLink className="cta-link" href="/contact">Get in touch <span>↗</span></TransitionLink>
        </div>
      </section>
    </main>
  );
}
