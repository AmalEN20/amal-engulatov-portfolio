import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About",
  description: "Capabilities and education for Amal Engulatov.",
};

export default function AboutPage() {
  redirect("/#capabilities");
}
