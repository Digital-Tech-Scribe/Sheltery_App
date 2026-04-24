import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { ContactContent as ContactContentType } from "../../types";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Contact.css";

interface ContactProps {
  content: ContactContentType;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  message: ""
};

export function Contact({ content }: ContactProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState<string>(content.helperText);
  const [isError, setIsError] = useState(false);
  const reveal = useScrollReveal<HTMLDivElement>();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formState.fullName.trim() ||
      !formState.email.trim() ||
      !formState.phone.trim() ||
      !formState.message.trim()
    ) {
      setIsError(true);
      setFeedback("Please complete every field before sending your inquiry.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formState.email)) {
      setIsError(true);
      setFeedback("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(
      `New Sheltery inquiry from ${formState.fullName}`
    );
    const body = encodeURIComponent(
      [
        `Full Name: ${formState.fullName}`,
        `Email: ${formState.email}`,
        `Phone: ${formState.phone}`,
        "",
        "Message:",
        formState.message
      ].join("\n")
    );

    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;

    setIsError(false);
    setFeedback("Your email client should open now with the inquiry prefilled.");
  };

  return (
    <section id="contact" className="section-shell contact">
      <div className="container contact__inner">
        <div className="contact__copy">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title contact__title">{content.title}</h2>
          <p className="section-copy contact__body">{content.copy}</p>
        </div>

        <div className="contact__details">
          <div>
            <span className="contact__detail-label">Phone</span>
            <a href={content.phoneHref}>{content.phone}</a>
          </div>
          <div>
            <span className="contact__detail-label">Email</span>
            <a href={`mailto:${content.email}`}>{content.email}</a>
          </div>
          <div>
            <span className="contact__detail-label">Location</span>
            <span>{content.location}</span>
          </div>
        </div>

        <div
          ref={reveal.ref}
          className={`contact__panel reveal ${reveal.isVisible ? "is-visible" : ""}`}
        >
          <form className="contact__form" onSubmit={handleSubmit}>
            <label className="contact__field">
              <span>Full Name</span>
              <input
                name="fullName"
                type="text"
                value={formState.fullName}
                onChange={handleChange}
                placeholder="Your name"
              />
            </label>
            <label className="contact__field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>
            <label className="contact__field">
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleChange}
                placeholder="+234..."
              />
            </label>
            <label className="contact__field contact__field--message">
              <span>Message</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Tell us what you need."
                rows={5}
              />
            </label>
            <button className="button-outline" type="submit">
              {content.submitLabel}
            </button>
            <p className={`contact__feedback ${isError ? "contact__feedback--error" : ""}`}>
              {feedback}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
