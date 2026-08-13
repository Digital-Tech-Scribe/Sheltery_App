import { useState } from "react";
import type { FooterContent as FooterContentType } from "../../types";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

interface FooterProps {
  content: FooterContentType;
}

const LOGO_SOURCES = [
  `${import.meta.env.BASE_URL}THE_SHELTERY_RED.png`,
  `${import.meta.env.BASE_URL}the-sheltery-logo.svg`,
];

export function Footer({ content }: FooterProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [logoSourceIndex, setLogoSourceIndex] = useState(0);
  const location = useLocation();
  const sectionHref = (target?: string) =>
    location.pathname === "/" ? `#${target}` : `${import.meta.env.BASE_URL}#${target}`;

  const handleLogoError = () => {
    if (logoSourceIndex < LOGO_SOURCES.length - 1) {
      setLogoSourceIndex(logoSourceIndex + 1);
    } else {
      setLogoFailed(true);
    }
  };

  return (
    <footer className="footer">
      <div className="holder">
        <div className="footer-top">
          <Link className="footer-logo" to="/" aria-label="The Sheltery home">
            {logoFailed ? (
              <span className="footer-logo-text">
                <span className="footer-logo-name">{content.logo}</span>
                <span className="footer-logo-sub">{content.location}</span>
              </span>
            ) : (
              <img src={LOGO_SOURCES[logoSourceIndex]} alt="The Sheltery" onError={handleLogoError} />
            )}
          </Link>
          <ul className="footer-nav">
            {content.nav.map((item) => (
              <li key={item.label}>
                <a href={sectionHref(item.target)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-text">
          <p>
            This information does not constitute an offer to purchase securities and merely constitutes an invitation for potential investors to register to receive further information. Any offer to make an investment will only be made through formal offering documents.
          </p>
          <p>
            Cautionary note on forward-looking statements: This information includes forward-looking statements concerning trends or anticipated results which are made pursuant to the safe harbor provisions of the Private Securities Litigation Reform Act of 1995.
          </p>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            Copyright &copy; {new Date().getFullYear()} The Sheltery. All rights reserved.
          </div>
          <div className="footer-studio">
            Created by <a href="https://dd.nyc/" target="_blank" rel="noreferrer">DD.NYC&reg;</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
