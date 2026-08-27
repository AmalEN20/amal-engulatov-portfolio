export type PortfolioProject = {
  slug: string;
  title: string;
  responsibility: string;
  category: string;
  summary: string;
  description: string;
  stack: readonly string[];
  websiteUrl?: string;
  websiteLabel: string;
  repositoryUrl?: string;
  repositoryLabel: string;
  imageSrc: string;
  imageAlt: string;
  year: string;
};

export const portfolioContent = {
  preloader: {
    line: "Passion to build something new and interesting.",
  },
  identity: {
    name: "Amal E",
    role: "Full-Stack Developer & Digital Product Builder",
    location: "Seattle, Washington",
    bio: [
      "I'm a self-taught developer trying to find my place in the chaos of AI and everything changing around it.",
      "I build focused full-stack web products that connect responsive interfaces with application logic, relational data, APIs, and practical AI-assisted workflows.",
      "I'm drawn to difficult challenges—building things I can't fully imagine at the start and learning my way toward them.",
    ],
  },
  experience: [
    {
      organization: "IHealth and Wellness Foundation",
      role: "Software Engineer",
      period: "Aug 2023 — Jul 2026",
      location: "Remote",
      description:
        "Developed and maintained frontend updates across a multi-page website, resolved responsive layout and interaction issues, refactored existing code, and validated fixes across desktop and mobile.",
    },
    {
      organization: "Independent",
      role: "Freelance Full-Stack Web Developer",
      period: "2025 — Present",
      location: "Seattle, Washington",
      description:
        "Build responsive websites and full-stack products across frontend, backend logic, APIs, relational data, third-party integrations, and AI-assisted business workflows.",
    },
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
      websiteUrl: "https://evele.studio",
      websiteLabel: "Visit live website",
      repositoryUrl: undefined,
      repositoryLabel: "Code · Private source",
      imageSrc: "/projects/evele-studio-home.jpg",
      imageAlt: "EVELE STUDIO homepage with a large EVELE wordmark on a dark background",
      year: "2026",
    },
    {
      slug: "amal-ai-studio",
      title: "AI CLIENT SEARCH SYSTEM",
      responsibility: "Client-acquisition OS / Full-stack development",
      category: "Client acquisition OS / Full-stack development",
      summary:
        "An owner-controlled client-acquisition OS for research, evidence audits, outreach drafts, and approval-gated actions.",
      description:
        "I built the application across the Next.js interface, Cloudflare Workers, D1 data layer, and Drizzle schema while keeping external actions behind explicit human approval.",
      stack: ["Next.js", "TypeScript", "Cloudflare Workers", "D1", "Drizzle"],
      websiteUrl: undefined,
      websiteLabel: "Live site not published",
      repositoryUrl: "https://github.com/AmalEN20/amal-ai-studio",
      repositoryLabel: "View source code",
      imageSrc: "/projects/amal-ai-studio-dashboard.png",
      imageAlt: "AI Client Search System dashboard showing a client research pipeline",
      year: "2026",
    },
  ] satisfies readonly PortfolioProject[],
  education: [
    {
      institution: "University of Washington",
      credential: "Full Stack Web Development Boot Camp Certificate",
      status: "Certificate",
    },
    {
      institution: "Meta",
      credential: "Front-End Developer Professional Certificate",
      status: "Certificate",
    },
    {
      institution: "Bellevue College",
      credential: "Associate Degree Transfer Program",
      status: "In Progress",
    },
  ],
  links: {
    github: "https://github.com/AmalEN20",
    linkedin: "https://www.linkedin.com/in/amal-engulatov-18b144277/",
  },
} as const;

export const portfolioProjects = portfolioContent.projects;

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
