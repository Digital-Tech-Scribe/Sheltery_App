import { useEffect, useRef } from "react";
import type { VisionContent as VisionContentType } from "../../types";
import { Reveal } from "../Reveal/Reveal";
import "./Vision.css";

interface VisionProps {
  content: VisionContentType;
}

export function Vision({ content }: VisionProps) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const statementLines = content.statement.split("\n");

  useEffect(() => {
    let frameId = 0;

    const updateFill = () => {
      frameId = 0;

      if (!innerRef.current) {
        return;
      }

      const rect = innerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * 0.82;
      const end = -rect.height * 0.28;
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end))
      );

      innerRef.current.style.setProperty(
        "--vision-fill-progress",
        progress.toFixed(4)
      );
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateFill);
    };

    updateFill();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section id="vision" className="section-shell vision">
      <Reveal className="container vision__inner" direction="up">
        <div ref={innerRef} className="vision__canvas">
          <div className="vision__content">
            <span className="eyebrow vision__eyebrow">{content.eyebrow}</span>
          </div>
          <div className="vision__stack">
            <p className="vision__ghost">
              {statementLines.map((line) => (
                <span key={line} className="vision__line">
                  {line}
                </span>
              ))}
            </p>
            <p className="vision__ghost-fill" aria-hidden="true">
              {statementLines.map((line) => (
                <span key={line} className="vision__line">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
