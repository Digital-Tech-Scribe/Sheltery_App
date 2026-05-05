# TREF Animation Integration Analysis

## Overview
This document provides a detailed analysis of the architectural and code-level changes made to integrate the premium animation patterns from the TREF reference site (`https://tref.digitaldesignnyc.co`) into the Sheltery App. The goal was to elevate the application's visual experience with high-end motion design, focusing on smooth inertial scrolling, staggered reveals, and scroll-triggered micro-interactions.

## 1. Dependency Integration
To achieve the desired aesthetic, two industry-standard animation libraries were introduced:
*   **`gsap` (GreenSock Animation Platform)**: Selected for its robust timeline control, advanced easing functions, and performance. `ScrollTrigger` (a GSAP plugin) was used for all scroll-based animation hooks.
*   **`lenis`**: A lightweight, performant smooth scrolling library that hijacks the native scroll to provide an inertial, "buttery" feel, which is a hallmark of luxury web design like the TREF site.

## 2. Core Animation Architecture

### Smooth Scrolling (`App.tsx`)
Lenis was integrated at the root level (`App.tsx`) to ensure global smooth scrolling.
*   **Synchronization**: A critical addition was syncing Lenis's `raf` (requestAnimationFrame) with GSAP's ticker. This ensures that GSAP's `ScrollTrigger` calculations perfectly align with the smoothed scroll position, preventing jitter.
*   **Entrance State Management**: Lenis is dynamically paused and started based on the `showEntrance` state to prevent scroll hijacking conflicts while the initial full-screen entrance animation plays.
*   **Programmatic Scrolling**: The custom `scrollToSection` function was updated to use `lenis.scrollTo()` with a custom easing function, providing a much smoother navigation experience than native `scrollIntoView`.

### Reusable Reveal Component (`src/components/Reveal/Reveal.tsx`)
To ensure consistency and DRY code, a unified `Reveal` wrapper component was created.
*   **Mechanism**: It utilizes `gsap.from()` and `ScrollTrigger` to animate its children as they enter the viewport (specifically when the top of the element hits 85% of the viewport height).
*   **Features**:
    *   Directional animation (up, down, left, right).
    *   Customizable delays and durations.
    *   Stagger support: If multiple children are present, they can stagger in sequentially, recreating the TREF staggered text effect.
    *   `onReveal` callback hook to trigger secondary state updates (used for the Stats count-up).

### Decorative Scroll Lines (`src/components/ScrollLine/ScrollLine.tsx`)
A signature element of the TREF site is structural, animated lines.
*   **Mechanism**: The `ScrollLine` component uses GSAP `fromTo` coupled with a `ScrollTrigger` that has `scrub: true`.
*   **Effect**: As the user scrolls through the container's bounds, the line scales along its axis (vertical or horizontal), visually tying sections together and creating a dynamic architectural grid.

## 3. Component-Level Implementations

### Navigation Menu (`Header.tsx` & `Header.css`)
The static CSS-toggled mobile drawer was completely rebuilt using a GSAP Timeline.
*   **Timeline Control**: A `gsap.timeline()` was created to orchestrate a two-part sequence: first, the drawer background slides/fades in, and then the navigation links stagger in from the side.
*   **State Syncing**: The timeline is `played()` or `reversed()` based on the `isMenuOpen` React state, allowing for fluid interruption if the user rapidly toggles the menu.
*   **CSS Cleanup**: Conflicting CSS transitions for opacity and transform on the drawer were removed to grant GSAP absolute control.

### Content Reveals (Various Sections)
The custom, class-based `useScrollReveal` hook was stripped out and replaced with the `Reveal` component across key sections:
*   **`Hero.tsx`**: The main headline, subtitle, and CTA buttons stagger up on load.
*   **`About.tsx`**: Image frames, typography, and metrics gracefully slide up. The `ScrollLine` component was added to the left flank to mimic TREF's framing.
*   **`Vision.tsx`**: The section container is wrapped in a `Reveal`, while maintaining its internal custom text-fill scroll effect.
*   **`Stats.tsx`**: The stat cards stagger up. Crucially, the `Reveal` component's `onReveal` callback was utilized to trigger the `useCountUp` hook exactly when the card finishes animating into view.
*   **`CoreValues.tsx` & `SuccessStories.tsx`**: Content blocks and testimonial carousels stagger into view, establishing a consistent rhythm throughout the page.

## Conclusion
By centralizing the animation logic within the `Reveal` and `ScrollLine` components and establishing a solid Lenis + GSAP foundation, the Sheltery App now possesses a highly cohesive, performant, and premium interaction model that closely aligns with the TREF reference.
