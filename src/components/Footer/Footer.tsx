import type { FooterContent as FooterContentType, NavItem } from "../../types";
import "./Footer.css";

interface FooterProps {
  content: FooterContentType;
  onNavigate: (target: string) => void;
}

function FooterNavItem({
  item,
  onNavigate
}: {
  item: NavItem;
  onNavigate: (target: string) => void;
}) {
  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => item.target && onNavigate(item.target)}>
      {item.label}
    </button>
  );
}

export function Footer({ content, onNavigate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brandline">
          <button className="footer__logo" type="button" onClick={() => onNavigate("home")}>
            <span className="footer__logo-main">{content.logo}</span>
            <span className="footer__logo-sub">Lagos, Nigeria</span>
          </button>
          <a className="footer__phone" href={content.phoneHref}>
            {content.phoneLabel}
          </a>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {content.nav.map((item) => (
            <FooterNavItem key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </nav>

        <div className="footer__meta">
          <p>{content.location}</p>
          <a href={`mailto:${content.email}`}>{content.email}</a>
          <div className="footer__socials">
            {content.socials.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>Copyright © {new Date().getFullYear()} The Sheltery. All rights reserved.</p>
          <p>Designed for confident property decisions in Lagos.</p>
        </div>
      </div>
    </footer>
  );
}
