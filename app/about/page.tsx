import type { Metadata } from "next";
import { TransitionLink } from "../components/SiteShell";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      <section className="page-hero about-hero container-shell">
        <div className="about-topline reveal-line"><span className="eyebrow">About / Amal Engulatov</span><span className="eyebrow">Seattle, WA · PT</span></div>
        <h1 className="page-title"><span className="line-mask"><span>I build useful</span></span><span className="line-mask"><span>intelligence.</span></span></h1>
        <div className="about-intro reveal-up">
          <span className="eyebrow">A little context</span>
          <div><p>I’m an AI software engineer focused on building useful agents and intelligent products. I care about clear interfaces, reliable systems, and understanding the real problem before writing the solution.</p><div className="about-facts"><span>AI engineering</span><span>Full-stack products</span><span>Human-centered systems</span></div></div>
        </div>
      </section>
      <section className="resume-section container-shell">
        <div className="resume-block reveal-up"><span className="eyebrow">Education</span><div className="resume-content">
          <article><h2>Bellevue College</h2><p>Associate Degree Transfer Program, Technology</p><span>In progress</span></article>
          <article><h2>University of Washington</h2><p>Full-Stack Web Development Boot Camp</p><span>Completed</span></article>
        </div></div>
        <div className="resume-block reveal-up"><span className="eyebrow">Certifications</span><div className="resume-content">
          <article><h2>Meta</h2><p>Front-End Developer Professional Certificate</p><span>Completed</span></article>
          <article><h2>Google</h2><p>IT Support Professional Certificate</p><span>Completed</span></article>
          <article><h2>Generative AI</h2><p>Software Engineering Specialization</p><span>In progress</span></article>
          <article><h2>Anthropic</h2><p>MCP: Build Rich-Context AI Apps with Anthropic</p><span>In progress</span></article>
        </div></div>
        <div className="resume-block reveal-up"><span className="eyebrow">Capabilities</span><div className="capability-list"><span>AI agents & orchestration</span><span>Python & TypeScript</span><span>Full-stack product development</span><span>RAG & tool use</span><span>Product thinking</span><span>Interface engineering</span></div></div>
      </section>
      <section className="about-cta container-shell reveal-up"><h2>Want the shorter version?</h2><TransitionLink className="pill-link" href="/contact">Start a conversation <span>↗</span></TransitionLink></section>
    </main>
  );
}
