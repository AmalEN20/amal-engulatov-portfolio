import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
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

  redirect(`/#project-${project.slug}`);
}
