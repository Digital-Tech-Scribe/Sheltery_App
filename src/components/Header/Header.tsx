import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import type { HeaderContent as HeaderContentType, NavItem } from "../../types";
import "./Header.css";

interface HeaderProps {
  content: HeaderContentType;
}

const LOGO_SOURCES = [
  `${import.meta.env.BASE_URL}THE_SHELTERY_RED.png`,
  `${import.meta.env.BASE_URL}the-sheltery-logo.svg`,
];

export function Header({ content }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoSourceIndex, setLogoSourceIndex] = useState(0);
  const [logoFailed, setLogoFailed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const sectionHref = (target?: string) =>
    location.pathname === "/" ? `#${target}` : `${import.meta.env.BASE_URL}#${target}`;

  const handleLogoError = useCallback(() => {
    if (logoSourceIndex < LOGO_SOURCES.length - 1) {
      setLogoSourceIndex(logoSourceIndex + 1);
    } else {
      setLogoFailed(true);
    }
  }, [logoSourceIndex]);

  return (
    <header className="header">
      <div className="holder">
        <div className="header-block">
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`mob-nav-icon ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="mob-nav-block" />
          </button>

          <div className="header-logo">
            <Link to="/" aria-label="The Sheltery home">
              {logoFailed ? (
                <span className="header-logo-text">
                  <span className="header-logo-kicker">{content.logoKicker}</span>
                  <span className="header-logo-name">{content.logo}</span>
                  <span className="header-logo-sub">{content.logoSub}</span>
                </span>
              ) : (
                <img src={LOGO_SOURCES[logoSourceIndex]} alt="The Sheltery" onError={handleLogoError} />
              )}
            </Link>
          </div>

          <div className={`header-nav ${menuOpen ? "vis" : ""}`}>
            <ul className="header-nav-list">
              {content.leftNav.map((item) => (
                <li key={item.label} className={item.target === "home" ? "current-menu-item" : ""}>
                  <a href={sectionHref(item.target)} onClick={closeMenu}>{item.label}</a>
                </li>
              ))}
            </ul>
            <ul className="header-nav-list">
              {content.rightNav.map((item) => (
                <li key={item.label}>
                  <a href={sectionHref(item.target)} onClick={closeMenu}>{item.label}</a>
                </li>
              ))}
            </ul>
            <a href={content.phoneHref} className="header-phone">{content.phoneLabel}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
