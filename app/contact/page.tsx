import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Amal Engulatov about frontend or full-stack opportunities.",
};

export default function ContactPage() {
  redirect("/#connect");
}
