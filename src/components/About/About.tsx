import type { AboutContent as AboutContentType } from "../../types";
import "./About.css";

interface AboutProps {
  content: AboutContentType;
}

export function About({ content }: AboutProps) {
  return (
    <div className="about-team">
      <div className="about-team-copy reveal">
        <div className="key-wrap">
          <div className="key" />
        </div>
        <div className="about-eyebrow">
          <div className="text-wrap">
            <div className="text-inner">{content.eyebrow}</div>
          </div>
        </div>
        <h2>
          <div className="text-wrap">
            <div className="text-inner">About<br />The Sheltery</div>
          </div>
        </h2>
        <p className="about-lead">{content.title}</p>
        <div className="about-team-text">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-team-metrics">
          {content.metrics.map((metric) => (
            <div className="about-metric" key={metric.label}>
              <span className="about-metric-value">{metric.value}</span>
              <span className="about-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
        <a href="#contact" className="link-flash about-team-cta">Contact The Sheltery</a>
      </div>

      <div className="about-team-visual img-float">
        <img src={content.image} alt="Azzizzat Oduwole, founder of The Sheltery" />
      </div>
    </div>
  );
}
