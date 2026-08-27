import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected work by Amal E: EVELE STUDIO and AI CLIENT SEARCH SYSTEM.",
};

export default function ProjectsPage() {
  redirect("/#projects");
}
