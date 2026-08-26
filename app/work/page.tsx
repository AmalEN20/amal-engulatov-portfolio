import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected work by Amal Engulatov: EVELE STUDIO and Amal AI Studio.",
};

export default function ProjectsPage() {
  redirect("/#selected-work");
}
