import { useEffect, useId, useRef, useState } from "react";
import "./Entrance.css";

interface EntranceProps {
  backgroundImage: string;
  onComplete: () => void;
}

interface ViewportState {
  width: number;
  height: number;
}

const REVEAL_DURATION_MS = 3600;
const EXIT_DURATION_MS = 680;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInCubic(value: number) {
  return value * value * value;
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function buildKeyholeGeometry({ width, height }: ViewportState) {
  const shortSide = Math.min(width, height);
  const centerX = width / 2;
  const circleRadius = shortSide * 0.082;
  const circleY = height * 0.455;
  const shaftTopY = circleY + circleRadius * 0.62;
  const shaftTopHalf = shortSide * 0.038;
  const shaftBottomHalf = shortSide * 0.065;
  const bottomY = height * 0.68;
  const topY = circleY - circleRadius;
  const originY = (topY + bottomY) / 2;

  const circlePath = [
    `M ${centerX} ${topY}`,
    `A ${circleRadius} ${circleRadius} 0 1 1 ${centerX - 0.01} ${
      topY
    }`,
    "Z",
  ].join(" ");

  const shaftPath = [
    `M ${centerX - shaftTopHalf} ${shaftTopY}`,
    `L ${centerX + shaftTopHalf} ${shaftTopY}`,
    `L ${centerX + shaftBottomHalf} ${bottomY}`,
    `L ${centerX - shaftBottomHalf} ${bottomY}`,
    "Z",
  ].join(" ");

  return {
    originX: centerX,
    originY,
    path: `${circlePath} ${shaftPath}`,
  };
}

export function Entrance({ backgroundImage, onComplete }: EntranceProps) {
  const clipId = useId().replace(/:/g, "");
  const rafRef = useRef<number>();
  const timeoutRef = useRef<number>();
  const [viewport, setViewport] = useState<ViewportState>(() => ({
    width: typeof window === "undefined" ? 1440 : window.innerWidth,
    height: typeof window === "undefined" ? 900 : window.innerHeight,
  }));
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const metaOpacity =
    1 - easeInCubic(clamp((progress - 0.68) / 0.18, 0, 1));
  const skipOpacity = lerp(0.18, 0.82, clamp((progress - 0.14) / 0.22, 0, 1));
  const primaryZoom = easeInOutCubic(clamp(progress / 0.82, 0, 1));
  const finalBurst = easeInCubic(clamp((progress - 0.82) / 0.18, 0, 1));
  const maskScale =
    lerp(1, 7.2, primaryZoom) + lerp(0, 18, finalBurst);
  const sceneWashOpacity =
    (1 - easeOutCubic(clamp(progress / 0.6, 0, 1))) * 0.24;
  const { originX, originY, path } = buildKeyholeGeometry(viewport);
  const maskTransform = `translate(${originX} ${originY}) scale(${maskScale}) translate(${-originX} ${-originY})`;

  const completeEntrance = () => {
    if (isExiting) {
      return;
    }

    setIsExiting(true);
    timeoutRef.current = window.setTimeout(() => {
      onComplete();
    }, EXIT_DURATION_MS);
  };

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Escape") {
        completeEntrance();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    let startTime = 0;

    const tick = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const nextProgress = clamp(
        (timestamp - startTime) / REVEAL_DURATION_MS,
        0,
        1
      );

      setProgress(nextProgress);

      if (nextProgress < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        completeEntrance();
      }, 320);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onComplete]);

  return (
    <div className={`entrance ${isExiting ? "is-exiting" : ""}`}>
      <svg
        className="entrance__scene"
        viewBox={`0 0 ${viewport.width} ${viewport.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={path} transform={maskTransform} />
          </clipPath>
          <linearGradient id={`${clipId}-wash`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.48)" />
            <stop offset="40%" stopColor="rgba(255, 240, 226, 0.18)" />
            <stop offset="100%" stopColor="rgba(255, 240, 226, 0)" />
          </linearGradient>
          <linearGradient id={`${clipId}-shade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(5, 11, 9, 0.04)" />
            <stop offset="68%" stopColor="rgba(5, 11, 9, 0.16)" />
            <stop offset="100%" stopColor="rgba(5, 11, 9, 0.32)" />
          </linearGradient>
        </defs>
        <g
          clipPath={`url(#${clipId})`}
          style={{
            transform: "translateY(0px) scale(1)",
            transformOrigin: "50% 50%",
          }}
        >
          <image
            href={backgroundImage}
            x="0"
            y="0"
            width={viewport.width}
            height={viewport.height}
            preserveAspectRatio="xMidYMid slice"
          />
          <rect
            x="0"
            y="0"
            width={viewport.width}
            height={viewport.height}
            fill={`url(#${clipId}-wash)`}
            opacity={sceneWashOpacity}
          />
          <rect
            x="0"
            y="0"
            width={viewport.width}
            height={viewport.height}
            fill={`url(#${clipId}-shade)`}
          />
        </g>
      </svg>

      <div className="entrance__meta">
        <p
          className="entrance__caption"
          style={{
            opacity: metaOpacity,
            transform: `translateY(${progress * 14}px)`,
          }}
        >
          Unlock the next chapter of Lagos living.
        </p>
        <span
          className="entrance__glyph"
          style={{ opacity: metaOpacity }}
          aria-hidden="true"
        >
          <span className="entrance__glyph-ring" />
          <span className="entrance__glyph-stem" />
          <span className="entrance__glyph-tooth" />
        </span>
      </div>

      <button
        type="button"
        className="entrance__skip"
        onClick={completeEntrance}
        style={{ opacity: skipOpacity }}
      >
        Skip Intro
      </button>
    </div>
  );
}
