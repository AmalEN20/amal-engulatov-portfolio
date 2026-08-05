"use client";

import { ValidationError, useForm } from "@formspree/react";
import { useState } from "react";
import type { CSSProperties } from "react";

const FORMSPREE_FORM_ID = "xykryaaj";

const fieldStyle = (index: number) =>
  ({ "--contact-field-index": index } as CSSProperties);

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
        <span className="form-success-index">Message / Sent</span>
        <h2>Message sent.</h2>
        <p>Thank you. I’ll get back to you as soon as I can.</p>
        <button className="contact-reset-button" type="button" onClick={resetForm}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New portfolio enquiry for Amal Engulatov" />

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website-check">Leave this field empty</label>
        <input id="website-check" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form-row">
        <div className="contact-field" style={fieldStyle(0)}>
          <label htmlFor="contact-name">Name</label>
          <div className="contact-control" data-has-value={values.name.length > 0}>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={values.name}
              onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
            />
            <span className="contact-placeholder" aria-hidden="true">
              <span className="contact-placeholder-text" data-text="Your name">Your name</span>
            </span>
          </div>
          <ValidationError className="field-error" field="name" prefix="Name" errors={state.errors} />
        </div>

        <div className="contact-field" style={fieldStyle(1)}>
          <label htmlFor="contact-email">Email</label>
          <div className="contact-control" data-has-value={values.email.length > 0}>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
              autoComplete="email"
              maxLength={180}
              required
            />
            <span className="contact-placeholder" aria-hidden="true">
              <span className="contact-placeholder-text" data-text="you@example.com">you@example.com</span>
            </span>
          </div>
          <ValidationError className="field-error" field="email" prefix="Email" errors={state.errors} />
        </div>
      </div>

      <div className="contact-field contact-field-message" style={fieldStyle(2)}>
        <label htmlFor="contact-message">Message</label>
        <div className="contact-control contact-control-message" data-has-value={values.message.length > 0}>
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
            rows={6}
            minLength={20}
            maxLength={3000}
            required
          />
          <span className="contact-placeholder" aria-hidden="true">
            <span className="contact-placeholder-text" data-text="The rough version is perfect.">
              The rough version is perfect.
            </span>
          </span>
        </div>
        <ValidationError className="field-error" field="message" prefix="Message" errors={state.errors} />
      </div>

      <ValidationError className="form-error" errors={state.errors} />

      <div className="contact-submit-row" style={fieldStyle(3)}>
        <button className="contact-submit-button" type="submit" disabled={state.submitting}>
          <span>{state.submitting ? "Sending…" : "Send message"}</span>
        </button>
      </div>
    </form>
  );
}
