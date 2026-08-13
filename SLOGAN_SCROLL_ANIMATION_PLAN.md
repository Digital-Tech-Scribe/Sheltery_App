# COMPREHENSIVE SPECIFICATION & EXECUTION PLAN: SLOGAN PINNED LIQUID SCROLL ANIMATION

> **Target Goal**: Replicate the exact slogan section scroll behavior shown in `Screen Recording 2026-08-13 at 9.21.53 AM.mov` on **The Sheltery** application (`Digital-Tech-Scribe/Sheltery_App`).

---

## 1. Context & Objectives

The `Slogan` component (`src/components/Slogan/Slogan.tsx`) displays the core brand philosophy:
> *"The Sheltery's business model is simple: Get into the real estate market near its low point and get out before an economic downturn."*

### Current State
- The section currently uses a basic width-clip animation (`.slogan-cover`) that clips text horizontally.
- It does not pin to the viewport, causing text to scroll away before the animation completes.

### Desired Reference Behavior
As demonstrated in the reference video (`Screen Recording 2026-08-13 at 9.21.53 AM.mov`):
1. **Viewport Pinning**: When the slogan section reaches the center/top of the screen, the section locks (`pin: true`) while the user continues to scroll.
2. **Liquid Character Fill ("Pouring Water Effect")**: The text reveals line-by-line from top to bottom, filling smoothly from muted wine (`rgba(242, 241, 237, 0.15)`) to crisp white (`#FFFFFF`).
3. **Section Overlap Exit**: When the text reveal completes, scrolling down causes the next section (`<Properties />`) to slide UP over the pinned slogan section.

---

## 2. Technical Architecture & File Modifications

### File 1: `src/components/Slogan/Slogan.tsx`

#### Requirements
- Import `gsap` and `ScrollTrigger` from `"gsap/ScrollTrigger"`.
- Split the slogan string into characters (`SLOGAN_TEXT.split("")`) to allow micro-staggered fluid text reveal.
- Wrap each character in `<span className="slogan-char">`. Replace space characters (`" "`) with non-breaking spaces (`"\u00A0"`) to maintain correct flex and inline rendering.
- Register GSAP `ScrollTrigger` inside a React `useEffect` hook using `gsap.context()` for clean lifecycle management.
- Configure a `gsap.timeline()` tied to `ScrollTrigger`:
  - `trigger`: Section element (`sectionRef.current`)
  - `start`: `"top top"`
  - `end`: `"+=140%"`
  - `pin`: `true`
  - `scrub`: `0.3`
  - `anticipatePin`: `1`
- Animate `.slogan-char` elements from `color: "rgba(242, 241, 237, 0.15)"` to `color: "#FFFFFF"` with `stagger: { amount: 1, ease: "none" }`.

#### Reference Implementation Code (`Slogan.tsx`)
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
```

---

### File 2: `src/components/Slogan/Slogan.css`

#### Requirements
- Update `.slogan-section` to full viewport height (`min-height: 100vh`) with flexbox centering.
- Maintain relative positioning and set `z-index: 1` so it acts as a background backdrop when pinned.
- Set `.slogan-char` as `display: inline`, `white-space: pre-wrap`, and `will-change: color`.

#### Reference Implementation Code (`Slogan.css`)
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
  margin: 0;
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
  transition: color 0.08s ease-out;
  white-space: pre-wrap;
  will-change: color;
}

@media screen and (max-width: 1023px) {
  .slogan-section {
    min-height: 80vh;
  }

  .slogan-container {
    padding: 0 24px;
  }

  .slogan-text {
    line-height: 135%;
    letter-spacing: -0.96px;
  }
}
```

---

### File 3: `src/components/Properties/Properties.css`

#### Requirements
- Add `z-index: 10` and `background: var(--c4)` to `.properties` so the section slides UP over the pinned slogan section during scroll exit.

#### Reference Implementation Code (`Properties.css`)
```css
.properties {
  position: relative;
  z-index: 10;
  background: var(--c4);
  padding: 80rem 0 210rem;
}
```

---

## 3. Step-by-Step Execution Checklist for AI Agent

1. [ ] **Code Changes**: Apply the specified code modifications to `Slogan.tsx`, `Slogan.css`, and `Properties.css`.
2. [ ] **Build Validation**: Run `npm run build` (`tsc --noEmit && vite build`) to confirm there are no TypeScript or bundling errors.
3. [ ] **Local Verification**: Start dev server with `npm run dev` and test scroll behavior at `http://localhost:5173`.
4. [ ] **Git Tracking**: Commit changes cleanly and verify `.gitignore` excludes large video assets (`*.mp4`, `*.mov`).
