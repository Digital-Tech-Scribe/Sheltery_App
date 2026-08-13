import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Slogan.css";

const SLOGAN_TEXT =
  "The Sheltery's business model is simple: Get into the real estate market near its low point and get out before an economic downturn.";

export function Slogan() {
  const sectionRef = useRef<HTMLElement>(null);
  const chars = SLOGAN_TEXT.split("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const charElements = sectionRef.current?.querySelectorAll(".slogan-char");
      if (!charElements || charElements.length === 0) return;

      gsap.set(charElements, { color: "rgba(242, 241, 237, 0.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
        },
      });

      tl.to(charElements, {
        color: "#FFFFFF",
        stagger: {
          amount: 1,
          ease: "none",
        },
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="slogan-section" ref={sectionRef}>
      <div className="slogan-container">
        <p className="slogan-text">
          {chars.map((char, index) => (
            <span key={index} className="slogan-char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}


