"use client";

import { ValidationError, useForm } from "@formspree/react";
import { useState } from "react";

const FORMSPREE_FORM_ID = "xykryaaj";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID, {
    data: {
      subject: "New portfolio enquiry for Amal Engulatov",
      source: "amal-engulatov-portfolio",
    },
  });

  const resetForm = () => {
    setValues({ name: "", email: "", message: "" });
    reset();
  };

  if (state.succeeded) {
    return (
      <div className="form-success" role="status">
        <span className="eyebrow">Message / Sent</span>
        <h2>Message sent.</h2>
        <p>Thank you. I’ll get back to you as soon as I can.</p>
        <button className="contact-reset-button" type="button" onClick={resetForm}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact Amal Engulatov">
      <input type="hidden" name="_subject" value="New portfolio enquiry for Amal Engulatov" />

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website-check">Leave this field empty</label>
        <input id="website-check" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form-grid">
        <div className="contact-field">
          <label htmlFor="contact-name">Name</label>
          <div className="contact-control">
            <input
              id="contact-name"
              name="name"
              type="text"
              value={values.name}
              onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
              autoComplete="name"
              minLength={2}
              maxLength={100}
              placeholder="Your name"
              required
            />
          </div>
          <ValidationError className="field-error" field="name" prefix="Name" errors={state.errors} />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-email">Email</label>
          <div className="contact-control">
            <input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
              autoComplete="email"
              maxLength={180}
              placeholder="you@example.com"
              required
            />
          </div>
          <ValidationError className="field-error" field="email" prefix="Email" errors={state.errors} />
        </div>
      </div>

      <div className="contact-field contact-field-message">
        <label htmlFor="contact-message">Message</label>
        <div className="contact-control contact-control-message">
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
            rows={6}
            minLength={20}
            maxLength={3000}
            placeholder="The rough version is perfect."
            required
          />
        </div>
        <ValidationError className="field-error" field="message" prefix="Message" errors={state.errors} />
      </div>

      <ValidationError className="form-error" errors={state.errors} />

      <div className="contact-submit-row">
        <button className="contact-submit-button" type="submit" disabled={state.submitting}>
          <span>{state.submitting ? "Sending…" : "Send message"}</span>
        </button>
      </div>
    </form>
  );
}
