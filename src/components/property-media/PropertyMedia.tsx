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
  const shouldRestoreDialogFocus = useRef(false);
  const shouldRestoreVideoFocus = useRef(false);

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
      <div className="property-media__featured-wrap">
        {isPlayingVideo && videoUrl ? (
          <div className="property-media__inline-video">
            <iframe
              title={`${propertyName} video`}
              src={`${videoUrl}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-scripts allow-presentation"
            />
            <button
              ref={closeVideoButtonRef}
              className="property-media__video-close"
              type="button"
              onClick={closeVideo}
              aria-label="Close video"
            >
              Close video
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
                className="property-media__play"
                type="button"
                onClick={openVideo}
              >
                <span aria-hidden="true">▶</span>
                Play film
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
