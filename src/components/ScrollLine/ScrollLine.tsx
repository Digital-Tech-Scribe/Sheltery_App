import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollLineProps {
  direction?: "vertical" | "horizontal";
  color?: string;
  thickness?: string;
  length?: string;
  className?: string;
}

export function ScrollLine({
  direction = "vertical",
  color = "rgba(220, 203, 179, 0.2)",
  thickness = "1px",
  length = "100%",
  className = "",
}: ScrollLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        {
          scaleY: direction === "vertical" ? 0 : 1,
          scaleX: direction === "horizontal" ? 0 : 1,
        },
        {
          scaleY: 1,
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction]);

  const style: React.CSSProperties = {
    position: "relative",
    width: direction === "vertical" ? thickness : length,
    height: direction === "vertical" ? length : thickness,
    backgroundColor: "transparent",
    overflow: "hidden",
  };

  const lineStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundColor: color,
    transformOrigin: direction === "vertical" ? "top" : "left",
  };

  return (
    <div ref={containerRef} className={className} style={style}>
      <div ref={lineRef} style={lineStyle} />
    </div>
  );
}
