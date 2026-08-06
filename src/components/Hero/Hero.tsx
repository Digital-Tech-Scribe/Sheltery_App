import { useEffect, useMemo, useState } from "react";
import type { HeroContent as HeroContentType } from "../../types";
import "./Hero.css";

interface HeroProps {
  content: HeroContentType;
  onReady: () => void;
  onAnimate: () => void;
}

export function Hero({ content, onReady, onAnimate }: HeroProps) {
  const heroSlides = useMemo(
    () =>
      (content.slides?.length ? content.slides : [content.backgroundImage]).filter(
        (slide): slide is string => Boolean(slide)
      ),
    [content.backgroundImage, content.slides]
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    onAnimate();
    setVisible(true);
  }, [onAnimate]);

  useEffect(() => {
    if (heroSlides.length < 2) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [heroSlides.length]);

  return (
    <section className="banner">
      <div className="banner-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={slide}
            className={`banner-slide banner-float ${index === activeSlide ? "is-active" : ""}`}
          >
            <img src={slide} alt="" />
          </div>
        ))}
      </div>

      <a href="#contact" className="button banner-cta-top">Property Inquiry</a>

      <div className="banner-main">
        <div className="holder">
          <div className={`banner-block ${visible ? "vis" : ""}`}>
            <div className="banner-col banner-col-left">
              <h1>The Sheltery<br />Expert Approach</h1>
            </div>
            <div className="banner-col banner-col-right">
              <div className="subheading" dangerouslySetInnerHTML={{ __html: (content.subtitle ?? "").replace(/\n/g, "<br/>") }} />
            </div>
            <a href="#contact" className="button banner-cta-mob">Property Inquiry</a>
          </div>
        </div>
      </div>
    </section>
  );
}
