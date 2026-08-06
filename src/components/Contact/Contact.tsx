import { useState } from "react";
import type { ContactContent as ContactContentType } from "../../types";
import "./Contact.css";

interface ContactProps {
  content: ContactContentType;
}

export function Contact({ content }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`New Sheltery inquiry from ${name}`);
    const body = encodeURIComponent(
      `Full Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${content.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section className="join" id="contact">
      <div className="holder reveal">
        <h2>
          <div className="text-wrap">
            <div className="text-inner">Join The Sheltery Club</div>
          </div>
        </h2>

        <div className="join-form">
          <div className="key-wrap">
            <div className="key" />
          </div>

          {!submitted ? (
            <form className="join-form-inner" onSubmit={handleSubmit}>
              <div className="input-box">
                <span className="input-item">
                  <label className="sr-only" htmlFor="contact-name">Full name</label>
                  <input id="contact-name" name="name" type="text" placeholder="full name" required />
                </span>
                <span className="input-item">
                  <label className="sr-only" htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" placeholder="email" required />
                </span>
                <span className="input-item">
                  <label className="sr-only" htmlFor="contact-phone">Phone</label>
                  <input id="contact-phone" name="phone" type="tel" placeholder="phone" />
                </span>
                <span className="input-item">
                  <label className="sr-only" htmlFor="contact-message">Message</label>
                  <input id="contact-message" name="message" type="text" placeholder="message" />
                </span>
              </div>
              <div className="form-button">
                <button className="button" type="submit">Send Property Inquiry</button>
              </div>
            </form>
          ) : (
            <div className="thanks">
              <h2>Thanks for Joining!</h2>
              <div className="subheading">Check your email to verify your application.</div>
              <a href="/" className="button">Back to Home Page</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
