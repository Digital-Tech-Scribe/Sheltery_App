import type { StatItem, StatsContent as StatsContentType } from "../../types";
import { useCountUp } from "../../hooks/useCountUp";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Stats.css";

function StatCard({ item }: { item: StatItem }) {
  const reveal = useScrollReveal<HTMLDivElement>();
  const value = useCountUp(item.value, reveal.isVisible);

  return (
    <div
      ref={reveal.ref}
      className={`stats__card luxury-panel reveal ${reveal.isVisible ? "is-visible" : ""}`}
    >
      <div className="stats__value">
        {item.prefix}
        {value}
        {item.suffix}
      </div>
      <h3 className="stats__label">{item.label}</h3>
      <p className="stats__description">{item.description}</p>
    </div>
  );
}

interface StatsProps {
  content: StatsContentType;
}

export function Stats({ content }: StatsProps) {
  const headingReveal = useScrollReveal<HTMLDivElement>();

  return (
    <section className="section-shell stats">
      <div className="container">
        <div
          ref={headingReveal.ref}
          className={`stats__intro reveal ${
            headingReveal.isVisible ? "is-visible" : ""
          }`}
        >
          <div className="section-heading">
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="section-title">{content.title}</h2>
          </div>
          <p className="section-copy stats__copy">{content.copy}</p>
        </div>

        <div className="stats__grid">
          {content.items.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
