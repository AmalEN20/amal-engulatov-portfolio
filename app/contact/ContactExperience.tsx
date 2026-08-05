"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ContactForm } from "../components/ContactForm";

type MotionState = "idle" | "armed" | "ready";

const revealStyle = (index: number) =>
  ({ "--contact-reveal-index": index } as CSSProperties);

export function ContactExperience() {
  const [motionState, setMotionState] = useState<MotionState>("idle");

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const entryIsBlocked = () =>
      root.dataset.intro === "active" || root.dataset.routeContent === "hidden";

    const reveal = () => {
      setMotionState(entryIsBlocked() ? "armed" : "ready");
    };

    const observer = new MutationObserver(reveal);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-intro", "data-route-content"],
    });
    reveal();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="contact-page" data-motion={motionState}>
      <div className="contact-page-layout">
        <h1 className="contact-backdrop" aria-label="Let’s talk.">
          <span className="contact-backdrop-line" aria-hidden="true">
            <span className="contact-backdrop-mask">
              <span className="contact-backdrop-word">LET’S</span>
            </span>
            <span className="contact-backdrop-mask">
              <span className="contact-backdrop-word">TALK</span>
            </span>
          </span>
        </h1>

        <section className="contact-compose" aria-labelledby="contact-form-heading">
          <header className="contact-compose-intro contact-reveal" style={revealStyle(0)}>
            <h2 id="contact-form-heading" aria-label="What’s on your mind?">
              <span className="contact-heading-mask" aria-hidden="true">
                <span className="contact-heading-text">What’s on your mind?</span>
              </span>
            </h2>
          </header>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
