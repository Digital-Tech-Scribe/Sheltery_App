import type { AboutContent as AboutContentType } from "../../types";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./About.css";

interface AboutProps {
  content: AboutContentType;
  onCta: () => void;
}

export function About({ content, onCta }: AboutProps) {
  const introReveal = useScrollReveal<HTMLDivElement>();
  const mediaReveal = useScrollReveal<HTMLDivElement>();
  const detailsReveal = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-shell about">
      <div className="container about__grid">
        <div
          ref={introReveal.ref}
          className={`about__intro reveal ${introReveal.isVisible ? "is-visible" : ""}`}
        >
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title about__title">{content.title}</h2>
        </div>

        <div
          ref={mediaReveal.ref}
          className={`about__media reveal ${mediaReveal.isVisible ? "is-visible" : ""}`}
        >
          <div className="media-frame about__frame">
            <img src={content.image} alt="The Sheltery founder portrait" />
          </div>
        </div>

        <div
          ref={detailsReveal.ref}
          className={`about__details reveal ${detailsReveal.isVisible ? "is-visible" : ""}`}
        >
          <div className="about__body">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} className="section-copy">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="about__metrics">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="about__metric">
                <span className="about__metric-value">{metric.value}</span>
                <span className="about__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
          <button className="button-outline about__cta" type="button" onClick={onCta}>
            {content.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
