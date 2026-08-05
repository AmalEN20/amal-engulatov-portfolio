import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageTitle } from "../../components/PageTitle";
import { TransitionLink } from "../../components/SiteShell";
import styles from "../ProjectDetail.module.css";
import { getPortfolioProject, portfolioProjects } from "../projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  return (
    <main className={styles.page}>
      <TransitionLink href="/work" transitionLabel="Projects" className={styles.backLink}>
        <span className={styles.backLabel}>Back to projects</span>
        <span className={styles.backIcon} aria-hidden="true">↖</span>
      </TransitionLink>

      <section className={styles.hero} aria-labelledby="project-title">
        <div className={styles.heading} id="project-title">
          <PageTitle>{project.title}</PageTitle>
        </div>
      </section>

      <section className={styles.caseStudy} aria-label={`${project.title} overview`}>
        <div className={styles.mediaFrame}>
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1280px) 68vw, 780px"
            className={styles.mediaImage}
          />
        </div>

        <div className={styles.projectInfo}>
          <div className={styles.summaryBlock}>
            <p className={styles.category}>{project.category}</p>
            <p className={styles.summary}>{project.summary}</p>
          </div>

          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>About the project</p>
            <p className={styles.description}>{project.description}</p>
          </div>

          <div className={styles.projectMeta}>
            <div>
              <p className={styles.infoLabel}>Built with</p>
              <ul className={styles.stack} aria-label="Project technologies">
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div>
              <p className={styles.infoLabel}>Source</p>
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.repositoryLink}
                >
                  {project.repositoryLabel} ↗
                </a>
              ) : (
                <p className={styles.repositoryStatus}>{project.repositoryLabel}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
