import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface MediaCarouselOptions {
  imageCount: number;
  isOpen: boolean;
  isPhotosTab: boolean;
  documentVisible: boolean;
  reducedMotion: boolean;
  onAdvance: () => void;
}

export function useMediaCarousel({
  imageCount,
  isOpen,
  isPhotosTab,
  documentVisible,
  reducedMotion,
  onAdvance,
}: MediaCarouselOptions) {
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isPointerPaused, setPointerPaused] = useState(false);
  const [isCarouselControlFocused, setCarouselControlFocused] = useState(false);
  const [restartToken, setRestartToken] = useState(0);
  const onAdvanceRef = useRef(onAdvance);

  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  const canAdvance = useMemo(
    () =>
      imageCount > 1 &&
      isOpen &&
      isPhotosTab &&
      documentVisible &&
      !reducedMotion &&
      !isUserPaused &&
      !isPointerPaused &&
      !isCarouselControlFocused,
    [
      documentVisible,
      imageCount,
      isCarouselControlFocused,
      isOpen,
      isPhotosTab,
      isPointerPaused,
      isUserPaused,
      reducedMotion,
    ],
  );

  useEffect(() => {
    if (!canAdvance) return;

    let cancelled = false;
    let timer = 0;

    const scheduleNext = () => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        onAdvanceRef.current();
        scheduleNext();
      }, 5000);
    };

    scheduleNext();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [canAdvance, restartToken]);

  const restartAfterManualNavigation = useCallback(() => {
    setRestartToken((token) => token + 1);
  }, []);

  const toggleUserPaused = useCallback(() => {
    setIsUserPaused((paused) => !paused);
  }, []);

  return {
    isUserPaused,
    setPointerPaused,
    setCarouselControlFocused,
    restartAfterManualNavigation,
    toggleUserPaused,
  };
}
