import type { AboutContent as AboutContentType } from "../../types";
import "./About.css";

interface AboutProps {
  content: AboutContentType;
}

export function About({ content }: AboutProps) {
  const title = "About\nThe Sheltery";

  return (
    <div className="about-team">
      <div className="about-team-col reveal">
        <div className="key-wrap">
          <div className="key" />
        </div>
        <h2>
          <div className="text-wrap">
            <div className="text-inner">{title}</div>
          </div>
        </h2>
        <div className="subheading">
          <div className="text-wrap">
            <div className="text-inner">{content.eyebrow}</div>
          </div>
        </div>
        <div className="about-team-text mob-hidden">
          {content.paragraphs[0]}
        </div>
      </div>

      <div className="about-team-col img-float">
        <img src={content.image} alt="The Sheltery founder" />
      </div>

      <div className="about-team-col">
        <div className="about-team-text">
          <span className="mob-hide">
            {content.paragraphs[0]}
          </span>
          {content.paragraphs[1]} {content.paragraphs[2]}
        </div>
        <a href="#contact" className="link-flash">Contact The Sheltery</a>
      </div>
    </div>
  );
}
