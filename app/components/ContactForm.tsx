"use client";

import { ValidationError, useForm } from "@formspree/react";

const FORMSPREE_FORM_ID = "xykryaaj";

export function ContactForm() {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID, {
    data: {
      subject: "New portfolio enquiry for Amal Engulatov",
      source: "amal-engulatov-portfolio",
    },
  });

  if (state.succeeded) {
    return (
      <div className="form-success" role="status">
        <h2>Message sent.</h2>
        <p>Thank you. I’ll get back to you as soon as I can.</p>
        <button className="button button-secondary" type="button" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New portfolio enquiry for Amal Engulatov" />

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website-check">Leave this field empty</label>
        <input id="website-check" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={100}
          required
        />
        <ValidationError className="field-error" field="name" prefix="Name" errors={state.errors} />
      </div>

      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={180}
          required
        />
        <ValidationError className="field-error" field="email" prefix="Email" errors={state.errors} />
      </div>

      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          minLength={20}
          maxLength={3000}
          required
        />
        <ValidationError className="field-error" field="message" prefix="Message" errors={state.errors} />
      </div>

      <ValidationError className="form-error" errors={state.errors} />

      <button className="button" type="submit" disabled={state.submitting}>
        {state.submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
