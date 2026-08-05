import type { Metadata } from "next";
import { ProjectsExperience } from "./ProjectsExperience";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work by Amal Engulatov: Evele Studio and Amal AI Studio.",
};

export default function ProjectsPage() {
  return <ProjectsExperience />;
}
