import { Reveal } from "../Reveal/Reveal";
import { ScrollLine } from "../ScrollLine/ScrollLine";
import type { AboutContent as AboutContentType } from "../../types";
import "./About.css";

interface AboutProps {
  content: AboutContentType;
  onCta: () => void;
}

export function About({ content, onCta }: AboutProps) {

  return (
    <section id="about" className="section-shell about">
      <ScrollLine 
        className="about__line-left" 
        thickness="1px" 
        length="100%" 
        color="rgba(220, 203, 179, 0.15)"
      />
      <div className="container about__grid">
        <Reveal className="about__intro" direction="up">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title about__title">{content.title}</h2>
        </Reveal>

        <Reveal className="about__media" direction="up" delay={0.2}>
          <div className="media-frame about__frame">
            <img src={content.image} alt="The Sheltery founder portrait" />
          </div>
        </Reveal>

        <Reveal className="about__details" direction="up" delay={0.4}>
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
        </Reveal>
      </div>
    </section>
  );
}
