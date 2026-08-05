import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { PageTitle } from "../../components/PageTitle";
import { AutoScrollProjectInfo } from "../AutoScrollProjectInfo";
import { BackToProjectsLink } from "../BackToProjectsLink";
import styles from "../ProjectDetail.module.css";
import { getPortfolioProject, portfolioProjects } from "../projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function RevealBlock({
  children,
  className = "",
  index,
}: {
  children: ReactNode;
  className?: string;
  index: number;
}) {
  return (
    <div className={styles.revealMask}>
      <div
        className={`${styles.revealBlock} ${className}`.trim()}
        style={{ "--detail-index": index } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

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
      <BackToProjectsLink className={styles.backLink}>
        <span className={styles.backRevealMask}>
          <span className={styles.backReveal}>
            <span className={styles.backLabel}>Back to projects</span>
          </span>
        </span>
      </BackToProjectsLink>

      <section className={styles.hero} aria-labelledby="project-title">
        <div className={styles.heading} id="project-title">
          <PageTitle className={styles.detailTitle}>{project.title}</PageTitle>
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

        <AutoScrollProjectInfo
          className={styles.projectInfo}
          ariaLabel={`${project.title} project details`}
        >
          <RevealBlock className={styles.summaryBlock} index={3}>
            <p className={`${styles.category} ${styles.metadataGradient}`}>
              {project.category}
            </p>
            <p className={styles.summary}>{project.summary}</p>
          </RevealBlock>

          <RevealBlock className={styles.infoBlock} index={4}>
            <p className={`${styles.infoLabel} ${styles.metadataGradient}`}>
              About the project
            </p>
            <p className={styles.description}>{project.description}</p>
          </RevealBlock>

          <div className={styles.projectMeta}>
            <RevealBlock index={5}>
              <p className={`${styles.infoLabel} ${styles.metadataGradient}`}>Built with</p>
              <ul className={styles.stack} aria-label="Project technologies">
                {project.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </RevealBlock>

            <RevealBlock index={6}>
              <p className={`${styles.infoLabel} ${styles.metadataGradient}`}>Source</p>
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
            </RevealBlock>
          </div>
        </AutoScrollProjectInfo>
      </section>
    </main>
  );
}
