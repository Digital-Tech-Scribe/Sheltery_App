import { useCallback, useEffect, useRef, useState } from "react";
import "./Loader.css";

interface LoaderProps {
  onComplete: () => void;
  onAnimate?: () => void;
}

const LOGO_SOURCES = [
  `${import.meta.env.BASE_URL}THE_SHELTERY_RED.png`,
  `${import.meta.env.BASE_URL}the-sheltery-logo.svg`,
];

const NORMAL_TIMING = {
  animate: 1200,
  exit: 2650,
  complete: 3000,
};

const REDUCED_MOTION_TIMING = {
  animate: 100,
  exit: 250,
  complete: 500,
};

export function Loader({ onComplete, onAnimate }: LoaderProps) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [logoSourceIndex, setLogoSourceIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;
  const animateRef = useRef(onAnimate);
  animateRef.current = onAnimate;

  const handleComplete = useCallback(() => {
    completeRef.current();
  }, []);

  const handleAnimate = useCallback(() => {
    animateRef.current?.();
  }, []);

  const handleLogoError = useCallback(() => {
    if (logoSourceIndex < LOGO_SOURCES.length - 1) {
      setLogoSourceIndex(logoSourceIndex + 1);
    } else {
      setLogoFailed(true);
    }
  }, [logoSourceIndex]);

  useEffect(() => {
    document.body.classList.add("is-loader");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timing = reducedMotion ? REDUCED_MOTION_TIMING : NORMAL_TIMING;

    const animateTimer = window.setTimeout(() => {
      loaderRef.current?.classList.add("animate");
      handleAnimate();
    }, timing.animate);

    const exitTimer = window.setTimeout(() => {
      loaderRef.current?.classList.add("exiting");
    }, timing.exit);

    const completeTimer = window.setTimeout(() => {
      document.body.classList.remove("is-loader");
      handleComplete();
    }, timing.complete);

    return () => {
      window.clearTimeout(animateTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.classList.remove("is-loader");
    };
  }, [handleComplete, handleAnimate]);

  const base = import.meta.env.BASE_URL;

  return (
    <div
      className="loader"
      ref={loaderRef}
      style={
        {
          "--hero-img": `url('${base}assets/hero-lagos.jpg')`,
          "--key-bg-img": `url('${base}assets/key-bg.svg')`,
          "--key-img": `url('${base}assets/key.svg')`,
        } as React.CSSProperties
      }
    >
      <div className="loader-bg" />
      <div className="loader-box">
        {logoFailed ? (
          <div className="loader-logo-text">
            <span className="loader-logo-kicker">The</span>
            <span className="loader-logo-name">Sheltery</span>
          </div>
        ) : (
          <img className="loader-logo" src={LOGO_SOURCES[logoSourceIndex]} alt="The Sheltery" onError={handleLogoError} />
        )}
        <div className="line">
          <div className="line-inner">Unlock exceptional</div>
        </div>
        <div className="line">
          <div className="line-inner">Lagos real estate.</div>
        </div>
        <div className="loader-key-wrap">
          <div className="loader-key" />
        </div>
      </div>
    </div>
  );
}
