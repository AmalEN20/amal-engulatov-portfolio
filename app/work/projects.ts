export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stack: readonly string[];
  repositoryUrl?: string;
  repositoryLabel: string;
};

export const portfolioProjects = [
  {
    slug: "evele-studio",
    title: "Evele Studio",
    category: "Studio website / Frontend & motion",
    year: "2026",
    summary:
      "A mobile-first studio website built around a clear one-page offer, original motion, and a complete source handoff.",
    description:
      "I designed and built Evele Studio for visual people and small brands who need a distinctive one-page website. The experience combines a focused $495 offer, original project stories, a guided five-stage process, and a complete source-code handoff.",
    imageSrc: "/projects/evele-studio-home.jpg",
    imageAlt: "Evele Studio homepage with a large EVELE wordmark on a dark background",
    stack: ["Next.js", "React", "TypeScript", "Motion systems"],
    repositoryUrl: undefined,
    repositoryLabel: "Private source repository",
  },
  {
    slug: "amal-ai-studio",
    title: "Amal AI Studio",
    category: "Client acquisition OS / Full-stack development",
    year: "2026",
    summary:
      "An owner-controlled client acquisition OS for research, evidence audits, outreach drafts, and approval-gated actions.",
    description:
      "I built Amal AI Studio as an operating system for a one-person web studio. It plans market research, discovers and deduplicates businesses, audits public websites with evidence, and drafts personalized outreach while keeping every message, expense, and publication behind an explicit human decision.",
    imageSrc: "/projects/amal-ai-studio-dashboard.png",
    imageAlt: "Amal AI Studio dashboard showing a client research pipeline",
    stack: ["Next.js", "TypeScript", "Cloudflare Workers", "D1", "Drizzle ORM"],
    repositoryUrl: "https://github.com/AmalEN20/amal-ai-studio",
    repositoryLabel: "View GitHub repository",
  },
] as const satisfies readonly PortfolioProject[];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
