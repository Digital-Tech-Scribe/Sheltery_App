import { useState } from "react";
import type { StatItem, StatsContent as StatsContentType } from "../../types";
import { useCountUp } from "../../hooks/useCountUp";
import { Reveal } from "../Reveal/Reveal";
import "./Stats.css";

function StatCard({ item }: { item: StatItem }) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const value = useCountUp(item.value, hasRevealed);

  return (
    <Reveal 
      className="stats__card luxury-panel" 
      direction="up" 
      onReveal={() => setHasRevealed(true)}
    >
      <div className="stats__value">
        {item.prefix}
        {value}
        {item.suffix}
      </div>
      <h3 className="stats__label">{item.label}</h3>
      <p className="stats__description">{item.description}</p>
    </Reveal>
  );
}

interface StatsProps {
  content: StatsContentType;
}

export function Stats({ content }: StatsProps) {

  return (
    <section className="section-shell stats">
      <div className="container">
        <Reveal className="stats__intro" direction="up">
          <div className="section-heading">
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="section-title">{content.title}</h2>
          </div>
          <p className="section-copy stats__copy">{content.copy}</p>
        </Reveal>

        <div className="stats__grid">
          {content.items.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
