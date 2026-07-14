import type { Metadata } from "next";
import { ProjectVisual } from "../components/ProjectVisual";
import { TransitionLink } from "../components/SiteShell";
import { projects } from "../data/projects";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <main className="inner-page">
      <section className="page-hero container-shell">
        <span className="eyebrow reveal-line">Work / 2026</span>
        <h1 className="page-title"><span className="line-mask"><span>Selected</span></span><span className="line-mask"><span>projects—</span></span></h1>
        <p className="page-lead reveal-up">A focused collection of AI products built around real customer problems, beginning with RetainAI.</p>
      </section>
      <section className="work-grid container-shell">
        {projects.map((project, index) => (
          <TransitionLink className="work-card reveal-up" key={project.slug} href={`/work/${project.slug}`} transitionLabel={project.title}>
            <ProjectVisual variant={project.variant} imageSrc={project.image} imageAlt={`${project.title} case study interface`} />
            <div className="work-card-meta"><span className="project-number">0{index + 1}</span><div><h2>{project.title}</h2><p>{project.category}</p></div><span>{project.year} ↗</span></div>
          </TransitionLink>
        ))}
      </section>
    </main>
  );
}
