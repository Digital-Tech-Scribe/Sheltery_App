import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaCarousel } from "./useMediaCarousel";

describe("useMediaCarousel", () => {
  afterEach(() => vi.useRealTimers());

  it("repeats at five-second intervals only while active", () => {
    vi.useFakeTimers();
    const onAdvance = vi.fn();
    renderHook(() =>
      useMediaCarousel({
        imageCount: 7,
        isOpen: true,
        isPhotosTab: true,
        reducedMotion: false,
        documentVisible: true,
        onAdvance,
      }),
    );
    act(() => vi.advanceTimersByTime(4999));
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(onAdvance).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(5000));
    expect(onAdvance).toHaveBeenCalledTimes(2);
  });

  it("resets a full five-second delay after manual navigation", () => {
    vi.useFakeTimers();
    const onAdvance = vi.fn();
    const { result } = renderHook(() =>
      useMediaCarousel({
        imageCount: 7,
        isOpen: true,
        isPhotosTab: true,
        reducedMotion: false,
        documentVisible: true,
        onAdvance,
      }),
    );
    act(() => vi.advanceTimersByTime(3000));
    act(() => result.current.restartAfterManualNavigation());
    act(() => vi.advanceTimersByTime(4999));
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  it.each([
    { isOpen: false, isPhotosTab: true, documentVisible: true, reducedMotion: false },
    { isOpen: true, isPhotosTab: false, documentVisible: true, reducedMotion: false },
    { isOpen: true, isPhotosTab: true, documentVisible: false, reducedMotion: false },
    { isOpen: true, isPhotosTab: true, documentVisible: true, reducedMotion: true },
  ])("does not advance when %# blocks playback", (props) => {
    vi.useFakeTimers();
    const onAdvance = vi.fn();
    renderHook(() => useMediaCarousel({ imageCount: 7, onAdvance, ...props }));
    act(() => vi.advanceTimersByTime(5000));
    expect(onAdvance).not.toHaveBeenCalled();
  });

  it("does not advance while user-paused, pointer-paused, or carousel-control-focused", () => {
    vi.useFakeTimers();
    const onAdvance = vi.fn();
    const { result } = renderHook(() =>
      useMediaCarousel({
        imageCount: 7,
        isOpen: true,
        isPhotosTab: true,
        documentVisible: true,
        reducedMotion: false,
        onAdvance,
      }),
    );
    act(() => result.current.toggleUserPaused());
    act(() => vi.advanceTimersByTime(5000));
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => result.current.toggleUserPaused());
    act(() => result.current.setPointerPaused(true));
    act(() => vi.advanceTimersByTime(5000));
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => result.current.setPointerPaused(false));
    act(() => result.current.setCarouselControlFocused(true));
    act(() => vi.advanceTimersByTime(5000));
    expect(onAdvance).not.toHaveBeenCalled();
  });

  it("exposes the user pause state for the Pause/Play control", () => {
    const onAdvance = vi.fn();
    const { result } = renderHook(() =>
      useMediaCarousel({
        imageCount: 7,
        isOpen: true,
        isPhotosTab: true,
        documentVisible: true,
        reducedMotion: false,
        onAdvance,
      }),
    );
    expect(result.current.isUserPaused).toBe(false);
    act(() => result.current.toggleUserPaused());
    expect(result.current.isUserPaused).toBe(true);
    act(() => result.current.toggleUserPaused());
    expect(result.current.isUserPaused).toBe(false);
  });
});
