import { useEffect, useRef, useState } from "react";
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

type FieldName = keyof FormState;

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
  const [errors, setErrors] = useState<Record<FieldName, string>>({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    message: false
  });
  const reveal = useScrollReveal<HTMLDivElement>();
  const feedbackResetRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackResetRef.current) {
        window.clearTimeout(feedbackResetRef.current);
      }
    };
  }, []);

  const validateField = (name: FieldName, value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "This field is required.";
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(trimmed)) {
        return "Please enter a valid email address.";
      }
    }

    if (name === "phone") {
      const digits = trimmed.replace(/[^\d+]/g, "");

      if (digits.length < 7) {
        return "Please enter a valid phone number.";
      }
    }

    if (name === "message" && trimmed.length < 12) {
      return "Please add a little more detail so we can help properly.";
    }

    return "";
  };

  const validateForm = (values: FormState) => ({
    fullName: validateField("fullName", values.fullName),
    email: validateField("email", values.email),
    phone: validateField("phone", values.phone),
    message: validateField("message", values.message)
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as FieldName;

    setFormState((current) => {
      const nextState = {
        ...current,
        [fieldName]: value
      };

      if (touched[fieldName]) {
        setErrors((currentErrors) => ({
          ...currentErrors,
          [fieldName]: validateField(fieldName, value)
        }));
      }

      return nextState;
    });
  };

  const handleBlur = (name: FieldName) => {
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, formState[name])
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextTouched = {
      fullName: true,
      email: true,
      phone: true,
      message: true
    };
    const nextErrors = validateForm(formState);

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setIsError(true);
      setFeedback("Please fix the highlighted fields before sending your inquiry.");
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

    if (feedbackResetRef.current) {
      window.clearTimeout(feedbackResetRef.current);
    }

    feedbackResetRef.current = window.setTimeout(() => {
      setFeedback(content.helperText);
    }, 3000);
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
                onBlur={() => handleBlur("fullName")}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
              />
              {errors.fullName ? (
                <span id="contact-fullName-error" className="contact__field-error" role="alert">
                  {errors.fullName}
                </span>
              ) : null}
            </label>
            <label className="contact__field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email ? (
                <span id="contact-email-error" className="contact__field-error" role="alert">
                  {errors.email}
                </span>
              ) : null}
            </label>
            <label className="contact__field">
              <span>Phone</span>
              <input
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleChange}
                onBlur={() => handleBlur("phone")}
                placeholder="+234..."
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              />
              {errors.phone ? (
                <span id="contact-phone-error" className="contact__field-error" role="alert">
                  {errors.phone}
                </span>
              ) : null}
            </label>
            <label className="contact__field contact__field--message">
              <span>Message</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                placeholder="Tell us what you need."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                rows={5}
              />
              {errors.message ? (
                <span id="contact-message-error" className="contact__field-error" role="alert">
                  {errors.message}
                </span>
              ) : null}
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
