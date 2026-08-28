import { useEffect, useMemo, useRef, useState } from "react";
import type { PropertyMap } from "../../types";
import { uniqueMediaImages } from "./mediaUtils";
import { PropertyMediaDialog } from "./PropertyMediaDialog";
import "./PropertyMedia.css";

export interface PropertyMediaProps {
  propertyName: string;
  status: string;
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;
  location: string;
  map: PropertyMap;
}

function PlayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}



export function PropertyMedia({
  propertyName,
  status,
  heroImage,
  galleryImages,
  videoUrl,
  location,
  map,
}: PropertyMediaProps) {
  const images = useMemo(
    () => uniqueMediaImages(heroImage, galleryImages),
    [galleryImages, heroImage],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeVideoButtonRef = useRef<HTMLButtonElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const shouldRestoreDialogFocus = useRef(false);
  const shouldRestoreVideoFocus = useRef(false);
  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    if (!isDialogOpen && shouldRestoreDialogFocus.current) {
      openerRef.current?.focus();
      shouldRestoreDialogFocus.current = false;
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (!isPlayingVideo && shouldRestoreVideoFocus.current) {
      playButtonRef.current?.focus();
      shouldRestoreVideoFocus.current = false;
    }
  }, [isPlayingVideo]);

  useEffect(() => {
    if (!videoUrl || hasAutoPlayedRef.current || isPlayingVideo) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = featuredRef.current;
    if (!el) return;
    const triggerAutoPlay = () => {
      if (hasAutoPlayedRef.current) return;
      hasAutoPlayedRef.current = true;
      setIsPlayingVideo(true);
    };
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAutoPlay();
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    const t = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) triggerAutoPlay();
    }, 1200);
    return () => {
      observer.disconnect();
      window.clearTimeout(t);
    };
  }, [videoUrl, isPlayingVideo]);

  const openDialog = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setSelectedIndex(index);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    shouldRestoreDialogFocus.current = true;
    setIsDialogOpen(false);
  };

  const openVideo = () => {
    setIsPlayingVideo(true);
    requestAnimationFrame(() => closeVideoButtonRef.current?.focus());
  };

  const closeVideo = () => {
    shouldRestoreVideoFocus.current = true;
    setIsPlayingVideo(false);
  };

  const sideImages = images.slice(1, 5);

  return (
    <section className="property-media" aria-label={`${propertyName} media preview`}>
      <div ref={featuredRef} className="property-media__featured-wrap">
        {isPlayingVideo && videoUrl ? (
          <div className="property-media__inline-video">
            <iframe
              title={`${propertyName} video`}
              src={`${videoUrl}?autoplay=1&mute=1&enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
            />
            <button
              ref={closeVideoButtonRef}
              className="property-media__video-close"
              type="button"
              onClick={closeVideo}
              aria-label="Close video"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <button
              className="property-media__photo property-media__photo--featured"
              type="button"
              onClick={(event) => openDialog(0, event.currentTarget)}
              aria-label={`View photo 1 of ${images.length}`}
            >
              <img src={images[0]} alt="" />
            </button>
            <span className="property-media__status">{status}</span>
            {videoUrl && (
              <button
                ref={playButtonRef}
                className="property-media__play property-media__play--icon-only"
                type="button"
                onClick={openVideo}
                aria-label="Play film"
              >
                <PlayIcon />
              </button>
            )}
          </>
        )}
      </div>

      {sideImages.length > 0 && (
        <div className="property-media__thumbnails" aria-label="More property photos">
          {sideImages.map((image, index) => {
            const imageIndex = index + 1;
            const isLastPreview = index === sideImages.length - 1;
            return (
              <button
                key={image}
                className="property-media__photo property-media__photo--thumbnail"
                type="button"
                onClick={(event) => openDialog(imageIndex, event.currentTarget)}
                aria-label={`View photo ${imageIndex + 1} of ${images.length}`}
              >
                <img src={image} alt="" />
                {isLastPreview && (
                  <span className="property-media__view-all">
                    View all {images.length} photos
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {isDialogOpen && (
        <PropertyMediaDialog
          images={images}
          propertyName={propertyName}
          selectedIndex={selectedIndex}
          location={location}
          map={map}
          onClose={closeDialog}
          onSelect={setSelectedIndex}
        />
      )}
    </section>
  );
}
