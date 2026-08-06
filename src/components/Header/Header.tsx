import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import type { HeaderContent as HeaderContentType, NavItem } from "../../types";
import "./Header.css";

interface HeaderProps {
  content: HeaderContentType;
}

export function Header({ content }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const sectionHref = (target?: string) =>
    location.pathname === "/" ? `#${target}` : `${import.meta.env.BASE_URL}#${target}`;
  const logoSource = `${import.meta.env.BASE_URL}THE_SHELTERY_RED.png`;

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
              <img src={logoSource} alt="The Sheltery" />
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
