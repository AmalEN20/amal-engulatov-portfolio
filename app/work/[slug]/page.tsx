import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectVisual } from "../../components/ProjectVisual";
import { TransitionLink } from "../../components/SiteShell";
import { getProject, projects } from "../../data/projects";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <main className={`inner-page project-page project-page-${project.slug}`}>
      <section className="project-hero container-shell">
        <div className="project-hero-copy"><span className="eyebrow reveal-line">{project.category} / {project.year}</span><h1 className="project-title"><span className="line-mask"><span>{project.title}</span></span></h1><p className="page-lead reveal-up">{project.summary}</p></div>
        <ProjectVisual variant={project.variant} imageSrc={project.image} imageAlt={`${project.title} case study interface`} />
      </section>
      <section className="case-grid container-shell reveal-up">
        <aside><span className="eyebrow">Project status</span><p>{project.status}</p><span className="eyebrow">Role</span><p>Product design<br />AI engineering<br />Full-stack development</p><div className="case-links"><a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">View live project <span>↗</span></a><a className="text-link" href={project.url} target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a></div></aside>
        <div><span className="eyebrow">Overview</span><h2>From scattered signals to a clear next action.</h2><p>RetainAI is designed around a simple idea: customer teams should spend less time assembling context and more time helping people. The product brings the right signals together and prepares an explainable next step.</p><TransitionLink className="pill-link" href="/work">Back to all projects <span>↗</span></TransitionLink></div>
      </section>
    </main>
  );
}
