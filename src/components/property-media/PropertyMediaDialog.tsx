import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import type { PropertyMap } from "../../types";
import { buildCoordinateMapUrl, buildMapsSearchUrl } from "./mediaUtils";
import { useMediaCarousel } from "./useMediaCarousel";

type MediaTab = "photos" | "map";

interface PropertyMediaDialogProps {
  images: string[];
  propertyName: string;
  selectedIndex: number;
  location: string;
  map: PropertyMap;
  onClose: () => void;
  onSelect: (index: number) => void;
}

const focusableSelector =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
}

function useDocumentVisibility() {
  const [documentVisible, setDocumentVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return documentVisible;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function PropertyMediaDialog({
  images,
  propertyName,
  selectedIndex,
  location,
  map,
  onClose,
  onSelect,
}: PropertyMediaDialogProps) {
  const [tab, setTab] = useState<MediaTab>("photos");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const carouselControlsRef = useRef<HTMLDivElement>(null);
  const documentVisible = useDocumentVisibility();
  const reducedMotion = useReducedMotion();
  const titleId = useId();
  const photosTabId = useId();
  const mapTabId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const previousPhoto = useCallback(() => {
    onSelect((selectedIndex - 1 + images.length) % images.length);
  }, [images.length, onSelect, selectedIndex]);

  const nextPhoto = useCallback(() => {
    onSelect((selectedIndex + 1) % images.length);
  }, [images.length, onSelect, selectedIndex]);

  const {
    isUserPaused,
    setPointerPaused,
    setCarouselControlFocused,
    restartAfterManualNavigation,
    toggleUserPaused,
  } = useMediaCarousel({
    imageCount: images.length,
    isOpen: true,
    isPhotosTab: tab === "photos",
    documentVisible,
    reducedMotion,
    onAdvance: nextPhoto,
  });

  const changePhoto = (direction: "previous" | "next") => {
    if (direction === "previous") previousPhoto();
    else nextPhoto();
    restartAfterManualNavigation();
  };

  const switchTab = (nextTab: MediaTab) => {
    setTab(nextTab);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    event.stopPropagation();
    switchTab(event.key === "ArrowLeft" ? "photos" : "map");
  };

  const handleControlsBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setCarouselControlFocused(false);
    }
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key === "Tab") {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = getFocusableElements(dialog);
      if (!focusable.length) return;
      const active = document.activeElement as HTMLElement | null;
      const currentIndex = active ? focusable.indexOf(active) : -1;
      const movingBackward = event.shiftKey;
      const isAtStart = currentIndex <= 0;
      const isAtEnd = currentIndex === focusable.length - 1;

      if ((!movingBackward && isAtEnd) || (movingBackward && isAtStart)) {
        event.preventDefault();
        (movingBackward ? focusable[focusable.length - 1] : focusable[0])?.focus();
      }
      return;
    }

    if (
      tab !== "photos" ||
      event.defaultPrevented ||
      (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
    ) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, select, textarea, [role='tab']")) {
      return;
    }

    event.preventDefault();
    changePhoto(event.key === "ArrowLeft" ? "previous" : "next");
  };

  return (
    <div
      className="property-media-dialog__overlay"
      data-testid="property-media-overlay"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="property-media-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        <header className="property-media-dialog__header">
          <div className="property-media-dialog__header-actions">
            <button
              ref={closeButtonRef}
              className="property-media-dialog__icon-button"
              type="button"
              onClick={onClose}
              aria-label="Close media"
            >
              ×
            </button>
          </div>

          <div className="property-media-dialog__tabs" role="tablist" aria-label="Media views">
            <button
              id={photosTabId}
              className={`property-media-dialog__tab ${tab === "photos" ? "is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={tab === "photos"}
              aria-controls="property-media-photos-panel"
              onClick={() => switchTab("photos")}
              onKeyDown={handleTabKeyDown}
            >
              Photos
            </button>
            <button
              id={mapTabId}
              className={`property-media-dialog__tab ${tab === "map" ? "is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={tab === "map"}
              aria-controls="property-media-map-panel"
              onClick={() => switchTab("map")}
              onKeyDown={handleTabKeyDown}
            >
              Map
            </button>
          </div>
          <h2 className="property-media-dialog__title" id={titleId}>
            {propertyName} media
          </h2>
        </header>

        {tab === "photos" ? (
          <section
            id="property-media-photos-panel"
            className="property-media-dialog__photos"
            role="tabpanel"
            aria-labelledby={photosTabId}
          >
            <div
              className="property-media-dialog__stage"
              onPointerEnter={() => setPointerPaused(true)}
              onPointerLeave={() => setPointerPaused(false)}
            >
              <img
                src={images[selectedIndex]}
                alt={`${propertyName} gallery item ${selectedIndex + 1}`}
              />
            </div>
            <div
              ref={carouselControlsRef}
              className="property-media-dialog__carousel-controls"
              onFocusCapture={() => setCarouselControlFocused(true)}
              onBlur={handleControlsBlur}
            >
              <button
                className="property-media-dialog__arrow property-media-dialog__arrow--previous"
                type="button"
                aria-label={`Previous photo, ${((selectedIndex - 1 + images.length) % images.length) + 1} of ${images.length}`}
                onClick={() => changePhoto("previous")}
              >
                ‹
              </button>
              <button
                className="property-media-dialog__pause"
                type="button"
                onClick={toggleUserPaused}
                aria-pressed={isUserPaused}
              >
                {isUserPaused ? "Play slideshow" : "Pause slideshow"}
              </button>
              <button
                className="property-media-dialog__arrow property-media-dialog__arrow--next"
                type="button"
                aria-label={`Next photo, ${(selectedIndex + 1) % images.length + 1} of ${images.length}`}
                onClick={() => changePhoto("next")}
              >
                ›
              </button>
            </div>
            <div className="property-media-dialog__counter" aria-live="polite">
              {selectedIndex + 1} / {images.length}
            </div>
          </section>
        ) : (
          <section
            id="property-media-map-panel"
            className="property-media-dialog__map"
            role="tabpanel"
            aria-labelledby={mapTabId}
          >
            {map.state === "verified" ? (
              <>
                <p className="property-media-dialog__map-label">{map.coordinates.label}</p>
                <iframe
                  title={`${map.coordinates.label} location map`}
                  src={buildCoordinateMapUrl(map.coordinates)}
                  loading="lazy"
                  sandbox="allow-scripts allow-popups"
                />
              </>
            ) : (
              <div className="property-media-dialog__map-fallback">
                <p>{map.fallbackLabel}</p>
                <a
                  href={buildMapsSearchUrl(location)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open approximate area in maps
                </a>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
