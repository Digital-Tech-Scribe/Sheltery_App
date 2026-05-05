import type { StoriesContent as StoriesContentType } from "../../types";
import { Reveal } from "../Reveal/Reveal";
import "./SuccessStories.css";

interface SuccessStoriesProps {
  content: StoriesContentType;
}

export function SuccessStories({ content }: SuccessStoriesProps) {

  return (
    <section id="stories" className="section-shell stories">
      <div className="container">
        <div className="section-grid section-grid--two stories__grid">
          <Reveal className="stories__copy" direction="up">
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="section-title stories__title">{content.title}</h2>
            <div className="stories__body">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="section-copy">
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              className="button-outline stories__cta"
              href={content.ctaHref}
              target="_blank"
              rel="noreferrer"
            >
              {content.ctaLabel}
            </a>
            <div className="stories__thumbnail">
              <img src={content.posterImage} alt="Luxury real estate scene in Lagos" />
              <div className="stories__thumbnail-copy">
                <span>Founder-Led Perspective</span>
                <strong>Media, mentorship, and real market context.</strong>
              </div>
            </div>
          </Reveal>

          <Reveal className="stories__media" direction="up" delay={0.2}>
            <div className="media-frame stories__video-frame">
              <iframe
                src={content.videoEmbedUrl}
                title={content.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>

        <Reveal className="stories__testimonials" direction="up" stagger={0.15}>
          {content.testimonials.map((testimonial, index) => (
            <article key={testimonial.author} className="stories__quote">
              <span className="stories__quote-index">0{index + 1}</span>
              <p className="stories__quote-text">“{testimonial.quote}”</p>
              <p className="stories__quote-author">{testimonial.author}</p>
              <p className="stories__quote-role">{testimonial.role}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
