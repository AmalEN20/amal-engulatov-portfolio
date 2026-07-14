import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="container-shell contact-hero">
        <span className="eyebrow reveal-line">Contact / Seattle, WA</span>
        <h1 className="contact-display"><span className="line-mask"><span>Let’s work</span></span><span className="line-mask"><span>together<span>.</span></span></span></h1>
        <div className="contact-details reveal-up"><div><span className="eyebrow">Email</span><a href="mailto:amal.engulatov1@gmail.com">amal.engulatov1@gmail.com <span className="link-arrow" aria-hidden="true" /></a></div><div><span className="eyebrow">Socials</span><p><a href="https://www.linkedin.com/in/amal-engulatov-18b144277/" target="_blank" rel="noreferrer">LinkedIn <span className="link-arrow" aria-hidden="true" /></a><a href="https://github.com/AmalEN20?tab=repositories" target="_blank" rel="noreferrer">GitHub <span className="link-arrow" aria-hidden="true" /></a></p></div><div><span className="eyebrow">Availability</span><p>Open to AI engineering roles, collaborations, and thoughtful product conversations.</p></div></div>
      </section>
      <section className="contact-form-section">
        <div className="container-shell contact-form-layout">
          <div className="contact-form-intro reveal-up">
            <span className="eyebrow">Start a conversation</span>
            <h2>Tell me what you’re building.</h2>
            <p>Share as much or as little as you have. A clear problem is more useful than a perfect brief.</p>
          </div>
          <div className="reveal-up"><ContactForm /></div>
        </div>
      </section>
    </main>
  );
}
