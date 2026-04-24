import type { CSSProperties } from "react";
import type { ValuesContent as ValuesContentType } from "../../types";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./CoreValues.css";

interface CoreValuesProps {
  content: ValuesContentType;
}

export function CoreValues({ content }: CoreValuesProps) {
  const headingReveal = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-shell values">
      <div className="container">
        <div
          ref={headingReveal.ref}
          className={`section-heading reveal ${headingReveal.isVisible ? "is-visible" : ""}`}
        >
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="section-title">{content.title}</h2>
          <p className="section-copy">{content.copy}</p>
        </div>

        <div className="values__grid">
          {content.items.map((item, index) => (
            <article
              key={item.title}
              className="values__card"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <div className="values__marker">0{index + 1}</div>
              <h3 className="values__title">{item.title}</h3>
              <p className="values__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
