export type PortfolioProject = {
  slug: string;
  title: string;
  responsibility: string;
  category: string;
  summary: string;
  description: string;
  stack: readonly string[];
  repositoryUrl?: string;
  repositoryLabel: string;
  sourceStatus: string;
  imageSrc: string;
  imageAlt: string;
  year: string;
};

export const portfolioContent = {
  identity: {
    name: "Amal Engulatov",
    role: "Full-Stack Developer & Digital Product Builder",
    location: "Seattle, Washington",
    bio: [
      "I build focused websites and web products across interfaces, application logic, data, and integrations.",
      "My work spans product structure, frontend systems, edge-backed application logic, and the motion details that make an interface feel considered.",
    ],
    availability: "Open to frontend and full-stack opportunities.",
  },
  notes: [
    "Motion should clarify the reading order",
    "AI actions should remain approval-gated",
    "Responsive design is a separate edit",
    "A build is not proof of smoothness",
    "Small interfaces can contain deep systems",
    "Product decisions should stay evidence-led",
  ],
  projects: [
    {
      slug: "evele-studio",
      title: "EVELE STUDIO",
      responsibility: "Studio website / Frontend & motion",
      category: "Studio website / Frontend & motion",
      summary:
        "A focused studio website shaped around a clear one-page offer, responsive frontend, and an original motion system.",
      description:
        "I designed and built the frontend in Next.js, React, and TypeScript, including the responsive experience and motion system. The source repository is private.",
      stack: ["Next.js", "React", "TypeScript", "Motion systems"],
      repositoryUrl: undefined,
      repositoryLabel: "Private source repository",
      sourceStatus: "Private source",
      imageSrc: "/projects/evele-studio-home.jpg",
      imageAlt: "EVELE STUDIO homepage with a large EVELE wordmark on a dark background",
      year: "2026",
    },
    {
      slug: "amal-ai-studio",
      title: "Amal AI Studio",
      responsibility: "Client-acquisition OS / Full-stack development",
      category: "Client acquisition OS / Full-stack development",
      summary:
        "An owner-controlled client-acquisition OS for research, evidence audits, outreach drafts, and approval-gated actions.",
      description:
        "I built the application across the Next.js interface, Cloudflare Workers, D1 data layer, and Drizzle schema while keeping external actions behind explicit human approval.",
      stack: ["Next.js", "TypeScript", "Cloudflare Workers", "D1", "Drizzle"],
      repositoryUrl: "https://github.com/AmalEN20/amal-ai-studio",
      repositoryLabel: "View GitHub repository",
      sourceStatus: "Public source",
      imageSrc: "/projects/amal-ai-studio-dashboard.png",
      imageAlt: "Amal AI Studio dashboard showing a client research pipeline",
      year: "2026",
    },
  ] satisfies readonly PortfolioProject[],
  experiments: [
    {
      title: "Interface motion",
      description:
        "Masked text, route continuity, and scroll-linked pacing built with the DOM first.",
      area: "Motion",
    },
    {
      title: "Approval-gated AI workflows",
      description:
        "Research, evidence checks, and outreach drafts that keep external actions under human control.",
      area: "AI systems",
    },
    {
      title: "Edge application stacks",
      description:
        "Cloudflare Workers, D1, and Drizzle as a compact full-stack deployment model.",
      area: "Full-stack",
    },
  ],
  links: {
    github: "https://github.com/AmalEN20",
  },
} as const;

export const portfolioProjects = portfolioContent.projects;

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
