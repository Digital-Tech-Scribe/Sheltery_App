import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Slogan.css";

const SLOGAN_TEXT =
  "The Sheltery's business model is simple: Get into the real estate market near its low point and get out before an economic downturn.";

export function Slogan() {
  const sectionRef = useRef<HTMLElement>(null);
  const words = SLOGAN_TEXT.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const wordElements = sectionRef.current?.querySelectorAll(".slogan-word");
      if (!wordElements || wordElements.length === 0) return;

      gsap.set(wordElements, { color: "rgba(242, 241, 237, 0.15)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      tl.to(wordElements, {
        color: "#FFFFFF",
        stagger: 0.1,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="slogan-section" ref={sectionRef}>
      <div className="slogan-container">
        <p className="slogan-text">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="slogan-word">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

