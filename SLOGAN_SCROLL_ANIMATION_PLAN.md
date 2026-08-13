# DETAILED REFINED PLAN: LIQUID CHARACTER TEXT FILL & OVERLAPPING SCROLL ANIMATION

> **Overview**: Based on the latest reference recording (`Screen Recording 2026-08-13 at 9.21.53 AM.mov`), this document outlines the exact technical implementation required to replicate the fluid "pouring water" character text fill and the smooth section overlap on **The Sheltery** website.

---

## 1. Refined Reference Video Analysis

### Key Design Observations
1. **Liquid Character Fill ("Water Pouring Effect")**:
   - As the user scrolls, white text fills the paragraph smoothly from top-left to bottom-right across lines.
   - The fill effect operates at the character level (`SLOGAN_TEXT.split("")`) using a linear stagger curve (`stagger: { amount: 1, ease: "none" }`).
   - Muted base text (`rgba(242, 241, 237, 0.15)`) transitions smoothly into bright white (`#FFFFFF`).

2. **Section Stacking & Content Overlap**:
   - The slogan section remains pinned while the user scrolls through the text reveal.
   - As the reveal completes, the following section (`<Properties />`) slides UP over top of the pinned slogan section.
   - The slogan section container acts as a fixed backdrop while subsequent page content flows over it.

---

## 2. Technical Architecture

### Component Code (`src/components/Slogan/Slogan.tsx`)
```tsx
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
          end: "+=150%",
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
        },
      });

      // Liquid character fill curve
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
              {char}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
```

### Stylesheet (`src/components/Slogan/Slogan.css`)
```css
.slogan-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--c4);
  z-index: 1;
}

.slogan-container {
  max-width: 1395rem;
  margin: 0 auto;
  padding: 0 40rem;
  text-align: center;
}

.slogan-text {
  text-align: center;
  font-family: 'NanumMyeongjo', serif;
  font-size: var(--high);
  font-weight: 400;
  line-height: 125%;
  letter-spacing: -2.88rem;
  margin: 0;
}

.slogan-char {
  display: inline;
  color: rgba(242, 241, 237, 0.15);
  transition: color 0.1s ease-out;
  white-space: pre-wrap;
}
```

---

## 3. Implementation Steps

- [ ] **Step 1**: Refactor `Slogan.tsx` to map character spans (`SLOGAN_TEXT.split("")`).
- [ ] **Step 2**: Update GSAP ScrollTrigger timeline to scrub character stagger (`stagger: { amount: 1, ease: "none" }`).
- [ ] **Step 3**: Configure section z-index ordering so subsequent content (`<Properties />`) overlaps the slogan section smoothly on scroll exit.
- [ ] **Step 4**: Verify build (`npm run build`).
