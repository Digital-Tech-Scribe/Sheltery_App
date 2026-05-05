import type { HeroContent as HeroContentType } from "../../types";
import { Reveal } from "../Reveal/Reveal";
import "./Hero.css";

interface HeroProps {
  content: HeroContentType;
  onPrimaryAction: () => void;
  onScrollHint: () => void;
  variant?: "default" | "quote" | "investment" | "join";
}

export function Hero({
  content,
  onPrimaryAction,
  onScrollHint,
  variant = "default",
}: HeroProps) {
  const variantClass = variant !== "default" ? `hero--${variant}` : "hero--home";
  const titleLines = content.title.split("\n");

  if (variant === "quote") {
    return (
      <section
        id="home"
        className={`hero hero--quote ${variantClass}`}
        style={{ backgroundImage: `var(--g1), url(${content.backgroundImage})` }}
      >
        <div className="hero__veil" />
        <div className="container hero__content">
          <div className="hero__copy">
            <h1 className="hero__title">{content.title}</h1>
            {content.quoteAttribution && (
              <p className="hero__quote-attribution">
                {content.quoteAttribution}
              </p>
            )}
          </div>
        </div>
        <div className="hero__base" />
      </section>
    );
  }

  if (variant === "investment") {
    return (
      <section
        id="investment"
        className={`hero hero--investment ${variantClass}`}
        style={{ backgroundImage: `var(--g1), url(${content.backgroundImage})` }}
      >
        <div className="hero__veil" />
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="hero__eyebrow">{content.eyebrow}</span>
            <h1 className="hero__title">{content.title}</h1>
            {content.body && <p className="hero__body">{content.body}</p>}
          </div>
          {content.secondaryImage && (
            <div
              className="hero__image"
              style={{ backgroundImage: `url(${content.secondaryImage})` }}
            />
          )}
        </div>
        <div className="hero__base" />
      </section>
    );
  }

  if (variant === "join") {
    return (
      <section
        id="join"
        className={`hero hero--join ${variantClass}`}
        style={{ backgroundImage: `var(--g1), url(${content.backgroundImage})` }}
      >
        <div className="hero__veil" />
        <div className="container hero__content">
          <div className="hero__copy">
            <span className="hero__eyebrow">{content.eyebrow}</span>
            <h1 className="hero__title">{content.title}</h1>
            <p className="hero__subtitle">{content.subtitle}</p>
            <form className="hero__form" onSubmit={(e) => e.preventDefault()}>
              <label className="hero__field">
                <span className="hero__field-label">Email Address</span>
                <input
                  type="email"
                  className="hero__input"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </label>
              <button
                type="submit"
                className="button-solid hero__submit"
                onClick={onPrimaryAction}
              >
                {content.primaryCta}
              </button>
            </form>
            <div className="hero__join-columns">
              {content.highlights?.length ? (
                <div className="hero__join-column hero__join-column--investment">
                  {content.highlights.map((item, index) => (
                    <p
                      key={`${item}-${index}`}
                      className={`hero__join-support-item ${
                        index === 0
                          ? "hero__join-support-item--lead"
                          : "hero__join-support-item--body"
                      }`}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ) : null}
              {content.body || content.quoteAttribution ? (
                <div className="hero__join-column hero__join-column--quote">
                  {content.body ? (
                    <p className="hero__join-detail">{content.body}</p>
                  ) : null}
                  {content.quoteAttribution ? (
                    <p className="hero__join-attribution">
                      {content.quoteAttribution}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="hero__base" />
      </section>
    );
  }

  return (
    <section
      id="home"
      className={`hero ${variantClass}`}
      style={{ backgroundImage: `var(--g1), url(${content.backgroundImage})` }}
    >
      <div className="hero__veil" />
      <div className="container hero__content">
        <div className="hero__copy">
          <Reveal direction="up" stagger={0.2}>
            <h1 className="hero__title">
              {titleLines.map((line) => (
                <span key={line} className="hero__title-line">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
        </div>

        <div className="hero__meta">
          <Reveal direction="up" delay={0.4}>
            <p className="hero__subtitle">{content.subtitle}</p>
          </Reveal>
          <Reveal direction="up" delay={0.6}>
            <div className="hero__actions">
              <button
                className="hero__cta"
                type="button"
                onClick={onPrimaryAction}
              >
                {content.primaryCta}
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <button className="hero__pager" type="button" onClick={onScrollHint}>
        <span className="hero__pager-arrow" aria-hidden="true">
          &#8249;
        </span>
        <span className="hero__pager-arrow" aria-hidden="true">
          &#8250;
        </span>
      </button>
    </section>
  );
}
