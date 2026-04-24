import { useEffect, useMemo, useState } from "react";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/typography.css";
import "./styles/animations.css";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Vision } from "./components/Vision/Vision";
import { Stats } from "./components/Stats/Stats";
import { CoreValues } from "./components/CoreValues/CoreValues";
import { SuccessStories } from "./components/SuccessStories/SuccessStories";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { WhatsAppWidget } from "./components/WhatsAppWidget/WhatsAppWidget";
import { Entrance } from "./components/Entrance/Entrance";
import {
  aboutContent,
  contactContent,
  footerContent,
  headerContent,
  heroContent,
  heroJoinContent,
  statsContent,
  storiesContent,
  valuesContent,
  visionContent
} from "./data/content";
import { useStickyHeader } from "./hooks/useStickyHeader";

function App() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const isSticky = useStickyHeader(48);
  const navTargets = useMemo(
    () =>
      Array.from(
        new Set(
          ["home", ...headerContent.leftNav, ...headerContent.rightNav]
            .map((item) => (typeof item === "string" ? item : item.target))
            .filter((target): target is string => Boolean(target))
        )
      ),
    []
  );

  useEffect(() => {
    const sections = navTargets
      .map((target) => document.getElementById(target))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    // Use a centered observation band so the active nav state follows the content
    // the user is actually reading, not the first section that barely touches the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-38% 0px -42% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navTargets]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    setActiveSection(sectionId);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleEntranceComplete = () => {
    setShowEntrance(false);
  };

  return (
    <>
      <div className={`site-shell ${showEntrance ? "site-shell--preload" : ""}`}>
        <Header
          content={headerContent}
          activeSection={activeSection}
          isSticky={isSticky}
          onNavigate={scrollToSection}
        />
        <main>
          <Hero
            content={heroContent}
            onPrimaryAction={() => scrollToSection("contact")}
            onScrollHint={() => scrollToSection("about")}
            variant="default"
          />
          <About
            content={aboutContent}
            onCta={() => scrollToSection("stories")}
          />
          <Vision content={visionContent} />
          <Stats content={statsContent} />
          <CoreValues content={valuesContent} />
          <SuccessStories content={storiesContent} />
          <Hero
            content={heroJoinContent}
            onPrimaryAction={() => scrollToSection("contact")}
            onScrollHint={() => scrollToSection("about")}
            variant="join"
          />
          <Contact content={contactContent} />
        </main>
        <Footer
          content={footerContent}
          onNavigate={scrollToSection}
        />
        <WhatsAppWidget />
      </div>
      {showEntrance ? (
        <Entrance
          backgroundImage={heroContent.backgroundImage ?? import.meta.env.BASE_URL + "assets/hero-lagos.jpg"}
          onComplete={handleEntranceComplete}
        />
      ) : null}
    </>
  );
}

export default App;
