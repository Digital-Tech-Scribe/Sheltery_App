import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { setDocumentVisibility, setReducedMotion } from "../../test/setup";
import { PropertyMedia } from "./PropertyMedia";

const unverifiedMap = {
  state: "unverified" as const,
  fallbackLabel: "Exact Hutu Exclusive estate coordinates are being verified.",
};

function renderMedia(
  overrides: Partial<ComponentProps<typeof PropertyMedia>> = {},
) {
  return render(
    <PropertyMedia
      propertyName="Hutu Exclusive"
      status="Available"
      heroImage="hero.jpg"
      galleryImages={[
        "one.jpg",
        "two.jpg",
        "three.jpg",
        "four.jpg",
        "five.jpg",
        "six.jpg",
        "hero.jpg",
      ]}
      location="Airport Road, Abuja"
      map={unverifiedMap}
      {...overrides}
    />,
  );
}

describe("PropertyMedia", () => {
  it("opens the selected thumbnail in a labelled dialog and restores focus on close", async () => {
    const user = userEvent.setup();
    renderMedia();
    const secondPhoto = screen.getByRole("button", { name: /view photo 2 of 7/i });

    await user.click(secondPhoto);

    expect(
      screen.getByRole("dialog", { name: /hutu exclusive media/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("2 / 7")).toHaveAttribute("aria-live", "polite");

    await user.click(screen.getByRole("button", { name: /close media/i }));
    expect(secondPhoto).toHaveFocus();
  });

  it("renders an honest fallback instead of an iframe for an unverified map", async () => {
    const user = userEvent.setup();
    renderMedia();

    await user.click(screen.getByRole("button", { name: /view photo 1 of 7/i }));
    await user.click(screen.getByRole("tab", { name: "Map" }));

    expect(
      screen.getByText("Exact Hutu Exclusive estate coordinates are being verified."),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /open approximate area in maps/i }),
    ).toHaveAttribute("href", expect.stringContaining("google.com/maps/search"));
    expect(screen.queryByTitle(/location map/i)).not.toBeInTheDocument();
  });

  it("renders a coordinate-derived iframe and label only for a verified map", async () => {
    const user = userEvent.setup();
    renderMedia({
      map: {
        state: "verified",
        coordinates: { lat: 9.1, lng: 7.4, zoom: 15, label: "Hutu Exclusive" },
        verification: {
          source: "Business-approved map record",
          verifiedAt: "2026-08-26",
        },
      },
    });

    await user.click(screen.getByRole("button", { name: /view photo 1 of 7/i }));
    await user.click(screen.getByRole("tab", { name: "Map" }));

    expect(screen.getByTitle("Hutu Exclusive location map")).toHaveAttribute(
      "src",
      expect.stringContaining("q=9.1%2C7.4"),
    );
    expect(screen.getByText("Hutu Exclusive")).toBeVisible();
    expect(
      screen.queryByRole("link", { name: /open approximate area in maps/i }),
    ).not.toBeInTheDocument();
  });

  it("traps focus and gives tab arrows precedence over photo navigation", () => {
    renderMedia({ galleryImages: ["one.jpg"] });
    fireEvent.click(screen.getByRole("button", { name: /view photo 1 of 2/i }));

    const dialog = screen.getByRole("dialog");
    const close = screen.getByRole("button", { name: /close media/i });
    const next = screen.getByRole("button", { name: /next photo/i });

    next.focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(close).toHaveFocus();

    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(next).toHaveFocus();

    const photosTab = screen.getByRole("tab", { name: "Photos" });
    photosTab.focus();
    fireEvent.keyDown(photosTab, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Map" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    const mapTab = screen.getByRole("tab", { name: "Map" });
    fireEvent.keyDown(mapTab, { key: "ArrowLeft" });
    expect(photosTab).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("closes through overlay and Escape while restoring opener focus", () => {
    renderMedia();
    const opener = screen.getByRole("button", { name: /view photo 1 of 7/i });

    fireEvent.click(opener);
    fireEvent.click(screen.getByTestId("property-media-overlay"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();

    fireEvent.click(opener);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps Play separate from photo activation and restores focus after video closes", () => {
    renderMedia({ videoUrl: "https://example.com/embed" });
    const play = screen.getByRole("button", { name: /play film/i });

    fireEvent.click(play);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTitle("Hutu Exclusive video")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close video/i }));

    expect(screen.queryByTitle("Hutu Exclusive video")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /play film/i })).toHaveFocus();
  });

  it("pauses when hidden or reduced motion changes live and resumes after five seconds", () => {
    vi.useFakeTimers();
    renderMedia({ galleryImages: ["one.jpg"] });
    fireEvent.click(screen.getByRole("button", { name: /view photo 1 of 2/i }));

    act(() => setDocumentVisibility(false));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    act(() => setDocumentVisibility(true));
    act(() => setReducedMotion(true));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    act(() => setReducedMotion(false));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });
});
