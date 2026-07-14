"use client";

import { ValidationError, useForm } from "@formspree/react";
import { AnimatePresence, motion } from "motion/react";

const FORMSPREE_FORM_ID = "xykryaaj";

export function ContactForm() {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID, {
    data: {
      subject: "New portfolio enquiry for Amal Engulatov",
      source: "amal-engulatov-portfolio",
    },
  });

  return (
    <AnimatePresence mode="wait">
      {state.succeeded ? (
        <motion.div
          className="form-success"
          key="success"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
          role="status"
        >
          <motion.div className="success-mark" initial={{ scale: 0.6, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, duration: 0.55, ease: [0.25, 1, 0.5, 1] }}>✓</motion.div>
          <span className="eyebrow">Message sent</span>
          <h2>Thank you<span>.</span></h2>
          <p>Your message is on its way. I’ll read it and get back to you as soon as I can.</p>
          <button className="form-reset" type="button" onClick={reset}>Send another message <span className="link-arrow" aria-hidden="true" /></button>
        </motion.div>
      ) : (
        <motion.form
          className="contact-form"
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        >
          <input type="hidden" name="_subject" value="New portfolio enquiry for Amal Engulatov" />

          <div className="contact-honeypot" aria-hidden="true">
            <label htmlFor="website-check">Leave this field empty</label>
            <input id="website-check" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="form-field form-field-wide">
            <label htmlFor="contact-name"><span>01</span> What’s your name? *</label>
            <input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" minLength={2} maxLength={100} required />
            <ValidationError className="field-error" field="name" prefix="Name" errors={state.errors} />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="contact-email"><span>02</span> Your email *</label>
              <input id="contact-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" maxLength={180} required />
              <ValidationError className="field-error" field="email" prefix="Email" errors={state.errors} />
            </div>
            <div className="form-field">
              <label htmlFor="contact-company"><span>03</span> Company</label>
              <input id="contact-company" name="company" type="text" placeholder="Company or team" autoComplete="organization" maxLength={120} />
              <ValidationError className="field-error" field="company" prefix="Company" errors={state.errors} />
            </div>
          </div>

          <div className="form-field form-field-wide">
            <label htmlFor="contact-type"><span>04</span> What can I help with? *</label>
            <select id="contact-type" name="projectType" defaultValue="" required>
              <option value="" disabled>Select one</option>
              <option value="AI engineering role">AI engineering role</option>
              <option value="AI agent or automation">AI agent or automation</option>
              <option value="Full-stack product">Full-stack product</option>
              <option value="Collaboration">Collaboration</option>
              <option value="Just saying hello">Just saying hello</option>
            </select>
            <ValidationError className="field-error" field="projectType" prefix="Project type" errors={state.errors} />
          </div>

          <div className="form-field form-field-wide">
            <label htmlFor="contact-message"><span>05</span> Tell me about it *</label>
            <textarea id="contact-message" name="message" placeholder="A little context, the problem you’re solving, and what a successful outcome looks like…" rows={6} minLength={20} maxLength={3000} required />
            <ValidationError className="field-error" field="message" prefix="Message" errors={state.errors} />
          </div>

          <ValidationError className="form-error" errors={state.errors} />

          <div className="form-submit-row">
            <p>By sending this form, you agree to be contacted about your message. No newsletters, no spam.</p>
            <button className="form-submit" type="submit" disabled={state.submitting}>
              <span>{state.submitting ? "Sending…" : "Send message"}</span>
              <i aria-hidden="true">{state.submitting ? "↻" : <span className="link-arrow" />}</i>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
