import { useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/typography.css";
import "./styles/animations.css";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Slogan } from "./components/Slogan/Slogan";
import { Properties } from "./components/Properties/Properties";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { Loader } from "./components/Loader/Loader";
import { PropertyCategoryPage } from "./pages/PropertyCategoryPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import {
  aboutContent,
  contactContent,
  footerContent,
  headerContent,
  heroContent,
} from "./data/content";

function NotFoundPage() {
  return (
    <div className="catalogue-page">
      <Header content={headerContent} />
      <main className="catalogue-main">
        <div className="holder">
          <div className="catalogue-empty">
            <h2>Page not found.</h2>
            <p>The page you are looking for does not exist.</p>
            <Link className="button" to="/">Go home</Link>
          </div>
        </div>
      </main>
      <Footer content={footerContent} />
    </div>
  );
}

function HomePage({ onHeroReady, onHeroAnimate }: { onHeroReady: () => void; onHeroAnimate: () => void }) {
  return (
    <>
      <Header content={headerContent} />
      <Hero content={heroContent} onReady={onHeroReady} onAnimate={onHeroAnimate} />

      <section className="main-wrap">
        <div className="holder">
          <About content={aboutContent} />
          <Slogan />
          <Properties />
        </div>
      </section>

      <Contact content={contactContent} />
      <Footer content={footerContent} />
    </>
  );
}

function AppRoutes({
  onHeroReady,
  onHeroAnimate,
  heroReady,
}: {
  onHeroReady: () => void;
  onHeroAnimate: () => void;
  heroReady: boolean;
}) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  // Home waits for Hero to signal ready (opacity fade-in). Deep links must be
  // visible immediately — they never mount Hero, so heroReady would stay false.
  const wrapperVisible = isHome ? heroReady : true;

  return (
    <div
      id="wrapper"
      style={{
        opacity: wrapperVisible ? 1 : 0,
        transition: "opacity 600ms ease",
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage onHeroReady={onHeroReady} onHeroAnimate={onHeroAnimate} />} />
        <Route path="/properties/:category" element={<PropertyCategoryPage />} />
        <Route path="/properties/:category/:slug" element={<PropertyDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [heroAnimate, setHeroAnimate] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();

      document.querySelectorAll(".img-float").forEach((el) => {
        const img = el.querySelector("img");
        if (!img) return;
        gsap.set(img, { yPercent: 0 });
        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: img, scrub: true },
        });
      });

      document.querySelectorAll(".banner-float").forEach((el) => {
        const img = el.querySelector("img");
        if (!img) return;
        gsap.set(img, { yPercent: 0 });
        gsap.to(img, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top top",
            scrub: true,
          },
        });
      });

      document.querySelectorAll(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            onEnter: () => el.classList.add("animate"),
          },
        });
      });

      document.querySelectorAll(".line-reveal").forEach((el) => {
        const dash = el.querySelector(".line-dash");
        if (!dash) return;
        gsap.to(dash, {
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 40%",
            end: "bottom 40%",
            onEnter: () => dash.classList.add("animate"),
          },
        });
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleHeroReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  const handleHeroAnimate = useCallback(() => {
    setHeroAnimate(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} onAnimate={handleHeroAnimate} />
      <AppRoutes onHeroReady={handleHeroReady} onHeroAnimate={handleHeroAnimate} heroReady={heroReady} />
    </>
  );
}

export default App;
