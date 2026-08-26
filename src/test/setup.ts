import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

type MediaQueryListener = (event: MediaQueryListEvent) => void;

type MediaQueryController = {
  matches: boolean;
  listeners: Set<MediaQueryListener>;
  list: MediaQueryList;
};

const mediaQueries = new Map<string, MediaQueryController>();

function createMediaQuery(query: string): MediaQueryController {
  const listeners = new Set<MediaQueryListener>();
  const controller = {} as MediaQueryController;

  controller.matches = false;
  controller.listeners = listeners;
  controller.list = {
    media: query,
    get matches() {
      return controller.matches;
    },
    onchange: null,
    addEventListener: (_type: "change", listener: MediaQueryListener) =>
      listeners.add(listener),
    removeEventListener: (_type: "change", listener: MediaQueryListener) =>
      listeners.delete(listener),
    addListener: (listener: MediaQueryListener) => listeners.add(listener),
    removeListener: (listener: MediaQueryListener) => listeners.delete(listener),
    dispatchEvent: () => true,
  } as MediaQueryList;

  return controller;
}

const matchMediaMock = vi.fn((query: string) => {
  let controller = mediaQueries.get(query);
  if (!controller) {
    controller = createMediaQuery(query);
    mediaQueries.set(query, controller);
  }
  return controller.list;
});

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  writable: true,
  value: matchMediaMock,
});

export function setDocumentVisibility(visible: boolean) {
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: !visible,
  });
  document.dispatchEvent(new Event("visibilitychange"));
}

export function setMediaQueryMatches(query: string, matches: boolean) {
  const controller = mediaQueries.get(query) ?? createMediaQuery(query);
  mediaQueries.set(query, controller);
  controller.matches = matches;
  const event = new Event("change") as MediaQueryListEvent;
  Object.defineProperties(event, {
    matches: { value: matches },
    media: { value: query },
  });
  controller.listeners.forEach((listener) => listener(event));
}

export function setReducedMotion(matches: boolean) {
  setMediaQueryMatches("(prefers-reduced-motion: reduce)", matches);
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  mediaQueries.clear();
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: matchMediaMock,
  });
  setDocumentVisibility(true);
});
