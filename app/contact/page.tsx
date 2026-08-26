import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Amal Engulatov about frontend or full-stack opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#contact-form">
        Skip to form
      </a>
      <main className="utility-page" id="contact-form">
        <Link className="utility-back" href="/">
          ← Amal Engulatov
        </Link>
        <header className="utility-header">
          <h1>Contact</h1>
          <p>
            For frontend or full-stack opportunities, share the role, product, or problem you are working on.
          </p>
        </header>
        <ContactForm />
      </main>
    </>
  );
}
