import { useEffect, useState } from "react";
import type { HeaderContent as HeaderContentType, NavItem } from "../../types";
import "./Header.css";

interface HeaderProps {
  content: HeaderContentType;
  activeSection: string;
  isSticky: boolean;
  onNavigate: (target: string) => void;
}

function NavLink({
  item,
  isActive,
  onNavigate,
  onAfterNavigate
}: {
  item: NavItem;
  isActive?: boolean;
  onNavigate: (target: string) => void;
  onAfterNavigate?: () => void;
}) {
  if (item.href) {
    return (
      <a
        className={`header__link ${isActive ? "is-active" : ""}`}
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
        aria-current={isActive ? "page" : undefined}
        onClick={onAfterNavigate}
      >
        {item.label}
      </a>
    );
  }

  return (
    <button
      className={`header__link ${isActive ? "is-active" : ""}`}
      type="button"
      aria-current={isActive ? "page" : undefined}
      onClick={() => {
        if (!item.target) {
          return;
        }

        onNavigate(item.target);
        onAfterNavigate?.();
      }}
    >
      {item.label}
    </button>
  );
}

export function Header({ content, activeSection, isSticky, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileNav = [...content.leftNav, ...content.rightNav];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isSticky ? "header--sticky" : ""}`}>
      <div className="container header__inner">
        <nav className="header__nav header__nav--desktop" aria-label="Primary">
          <div className="header__group">
            {content.leftNav.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                isActive={item.target === activeSection}
                onNavigate={onNavigate}
              />
            ))}
          </div>
          <button
            className="header__logo"
            type="button"
            onClick={() => onNavigate("home")}
          >
            {content.logoKicker ? (
              <span className="header__logo-kicker">{content.logoKicker}</span>
            ) : null}
            <span className="header__logo-main">{content.logo}</span>
            <span className="header__logo-sub">
              {content.logoSub ?? "Lagos, Nigeria"}
            </span>
          </button>
          <div className="header__group header__group--right">
            {content.rightNav.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                isActive={item.target === activeSection}
                onNavigate={onNavigate}
              />
            ))}
            <a className="header__phone" href={content.phoneHref}>
              {content.phoneLabel}
            </a>
          </div>
        </nav>

        <div className="header__mobile">
          <button
            className="header__logo"
            type="button"
            onClick={() => onNavigate("home")}
          >
            {content.logoKicker ? (
              <span className="header__logo-kicker">{content.logoKicker}</span>
            ) : null}
            <span className="header__logo-main">{content.logo}</span>
            <span className="header__logo-sub">
              {content.logoSub ?? "Lagos, Nigeria"}
            </span>
          </button>
          <button
            className={`header__toggle ${isMenuOpen ? "header__toggle--open" : ""}`}
            type="button"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`header__drawer ${isMenuOpen ? "header__drawer--open" : ""}`}>
        <div className="container header__drawer-inner">
          <div className="header__drawer-links">
            {mobileNav.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                isActive={item.target === activeSection}
                onNavigate={onNavigate}
                onAfterNavigate={() => setIsMenuOpen(false)}
              />
            ))}
          </div>
          <a className="header__phone header__phone--mobile" href={content.phoneHref}>
            {content.phoneLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
