import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
  className?: string;
  triggerOnce?: boolean;
  onReveal?: () => void;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1,
  distance = 50,
  stagger = 0.1,
  className = "",
  triggerOnce = true,
  onReveal,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      onReveal?.();
      return;
    }

    const x = direction === "left" ? distance : direction === "right" ? -distance : 0;
    const y = direction === "up" ? distance : direction === "down" ? -distance : 0;

    const ctx = gsap.context(() => {
      const targets = element.children.length > 0 ? Array.from(element.children) : [element];

      gsap.from(targets, {
        x,
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: triggerOnce,
          toggleActions: "play none none none",
          onEnter: () => onReveal?.(),
        },
      });
    }, element);

    return () => ctx.revert();
  }, [direction, delay, duration, distance, stagger, triggerOnce, onReveal]);

  return (
    <div ref={elementRef} className={className} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
