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
    bio:
      "I build focused websites and web products across interfaces, application logic, data, and integrations.",
    availability: "Open to frontend and full-stack opportunities.",
  },
  navigation: [
    { href: "#selected-work", label: "Work" },
    { href: "#capabilities", label: "Capabilities" },
    { href: "#connect", label: "Connect" },
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
  capabilities: [
    {
      title: "Product interfaces",
      description:
        "Responsive, accessible interfaces in React, Next.js, and TypeScript, including motion systems that support the content.",
    },
    {
      title: "Application systems",
      description:
        "Full-stack workflows spanning application logic, APIs, Cloudflare Workers, D1, and Drizzle-backed data models.",
    },
    {
      title: "Product delivery",
      description:
        "From product structure and implementation through desktop, mobile, accessibility, and motion QA.",
    },
  ],
  education: [
    {
      institution: "University of Washington",
      credential: "Full Stack Web Development Boot Camp Certificate",
    },
    {
      institution: "Meta",
      credential: "Front-End Developer Professional Certificate",
    },
    {
      institution: "Bellevue College",
      credential: "Associate Degree Transfer Program — In Progress",
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
