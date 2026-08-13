# DETAILED PLAN: PINNED SCROLL-DRIVEN SLOGAN ANIMATION REPAIR

> **Overview**: This document presents a comprehensive technical plan to fix the slogan scroll animation in **The Sheltery** web application, based on the comparative analysis of `Currently.mp4` and `How_it_should_animate.mp4`.

---

## 1. Frame-by-Frame Video Analysis & Findings

### Defect Analysis (`Currently.mp4`)
In the current implementation:
1. **Unpinned Page Flow**: The `<Slogan />` component scrolls up the page naturally as the user scrolls. Because the section is not pinned to the viewport (`pin: true` is missing in GSAP ScrollTrigger), the user scrolls right past the section before the text reveal completes.
2. **Width-Clipping Artefacts**: In `Slogan.tsx`, the code overlays a duplicate text string (`<span className="slogan-cover">`) positioned absolutely over the text line and animates its `width` from `0%` to `100%`. When text breaks onto multiple lines on responsive viewports, animating container width clips letters in half horizontally across wrapped lines, creating layout glitches.

### Target Reference Analysis (`How_it_should_animate.mp4`)
In the reference demonstration video:
1. **Sticky Viewport Pinning**: As soon as the slogan section scrolls into view (centered vertically in the viewport), GSAP `ScrollTrigger` pins the section (`pin: true`). The section stays locked in place while the rest of the page remains still.
2. **Scroll-Driven Word Stagger Reveal**: As the user scrolls down, the scroll progress directly controls a word-by-word (or character-by-character) reveal animation.
3. **Typography Color Transition**: Words start in a dark/muted color (`rgba(242, 241, 237, 0.15)`) against the wine background, and smoothly shift to 100% full-opacity white (`#FFFFFF` / `var(--c1)`) as scroll advances.
4. **Smooth Pin Release**: Once all words reach 100% opacity, the section unpins cleanly, allowing the user to continue scrolling into the `<Properties />` section below.

---

## 2. Technical Architecture & Proposed Refactoring

### A. Component Refactoring (`src/components/Slogan/Slogan.tsx`)

#### DOM Restructuring
Replace duplicate overlapping spans with a clean word-wrapped array structure:
```tsx
const SLOGAN_TEXT = "The Sheltery's business model is simple: Get into the real estate market near its low point and get out before an economic downturn.";
const words = SLOGAN_TEXT.split(" ");

return (
  <section className="slogan-section" ref={sectionRef}>
    <div className="slogan-container">
      <p className="slogan-text">
        {words.map((word, index) => (
          <span key={index} className="slogan-word">
            {word}{" "}
          </span>
        ))}
      </p>
    </div>
  </section>
);
```

#### GSAP ScrollTrigger Configuration
- Register `ScrollTrigger`.
- Set initial state of all `.slogan-word` elements: `color: "rgba(242, 241, 237, 0.15)"` (muted).
- Create a GSAP timeline with viewport pinning and scroll scrubbing:
```typescript
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  const ctx = gsap.context(() => {
    const wordElements = sectionRef.current?.querySelectorAll(".slogan-word");
    if (!wordElements || wordElements.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%", // Pins for 1.5x viewport height scroll distance
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    tl.to(wordElements, {
      color: "#ffffff",
      stagger: 0.1,
      ease: "power1.inOut",
    });
  });

  return () => ctx.revert();
}, []);
```

---

### B. Stylesheet Updates (`src/components/Slogan/Slogan.css`)

```css
.slogan-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c4);
  position: relative;
  overflow: hidden;
}

.slogan-container {
  max-width: 1395rem;
  margin: 0 auto;
  padding: 0 40rem;
  text-align: center;
}

.slogan-text {
  font-family: 'NanumMyeongjo', serif;
  font-size: var(--high);
  font-weight: 400;
  line-height: 125%;
  letter-spacing: -2rem;
  margin: 0;
}

.slogan-word {
  display: inline-block;
  color: rgba(242, 241, 237, 0.15);
  transition: color 0.1s ease;
  white-space: pre;
}

@media screen and (max-width: 1023px) {
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

## 3. Step-by-Step Execution Checklist

- [ ] **Step 1**: Refactor `src/components/Slogan/Slogan.tsx` DOM to render mapped `.slogan-word` spans.
- [ ] **Step 2**: Configure GSAP `ScrollTrigger` timeline with `pin: true`, `start: "top top"`, `end: "+=150%"`, and `scrub: 0.5`.
- [ ] **Step 3**: Update `src/components/Slogan/Slogan.css` with `min-height: 100vh` flex layout and inline word span styling.
- [ ] **Step 4**: Test production build (`npm run build`).
- [ ] **Step 5**: Verify smooth pinning and word-by-word reveal in browser.
- [ ] **Step 6**: Commit and push to GitHub repository (`main` branch).
