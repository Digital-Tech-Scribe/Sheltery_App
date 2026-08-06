import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Slogan.css";

const SLOGAN_TEXT = "The Sheltery's business model is simple: Get into the real estate market near its low point and get out before an economic downturn.";

export function Slogan() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const covers = sectionRef.current?.querySelectorAll(".slogan-cover");
      if (!covers) return;

      covers.forEach((cover) => {
        gsap.set(cover, { width: 0 });
        gsap.to(cover, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: cover,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="slogan" ref={sectionRef}>
      <div className="slogan-text">
        <span className="slogan-line">
          {SLOGAN_TEXT}
          <span className="slogan-cover">{SLOGAN_TEXT}</span>
        </span>
      </div>
    </div>
  );
}
