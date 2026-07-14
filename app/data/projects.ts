export const projects = [
  {
    slug: "retainai",
    title: "RetainAI",
    category: "AI Customer Success / Full-Stack Development",
    year: "2026",
    variant: "agent",
    status: "Active project",
    summary: "An AI-powered customer-success platform that brings account context, conversations, and next-best actions into one focused workflow.",
    url: "https://github.com/AmalEN20/RetainAI",
    liveUrl: "https://retainai-copilot.amalai.chatgpt.site/case-study",
    image: "/retainai-case-study.jpg",
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
