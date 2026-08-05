import type { Metadata } from "next";
import { ContactExperience } from "./ContactExperience";

export const metadata: Metadata = {
  title: "Contact | Amal Engulatov",
  description: "Contact Amal Engulatov.",
};

export default function ContactPage() {
  return <ContactExperience />;
}
