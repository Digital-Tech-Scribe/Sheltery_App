import type { CSSProperties } from "react";
import type { ValuesContent as ValuesContentType } from "../../types";
import { Reveal } from "../Reveal/Reveal";
import "./CoreValues.css";

interface CoreValuesProps {
  content: ValuesContentType;
}

export function CoreValues({ content }: CoreValuesProps) {

  return (
    <section className="section-shell values">
      <div className="container">
        <Reveal className="section-heading" direction="up">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-copy">{content.copy}</p>
        </Reveal>

        <Reveal className="values__grid" direction="up" stagger={0.1}>
          {content.items.map((item, index) => (
            <article
              key={item.title}
              className="values__card"
            >
              <div className="values__marker">0{index + 1}</div>
              <h3 className="values__title">{item.title}</h3>
              <p className="values__description">{item.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
