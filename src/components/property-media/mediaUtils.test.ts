import { describe, expect, it } from "vitest";
import {
  buildApproximateMapUrl,
  buildCoordinateMapUrl,
  buildMapsSearchUrl,
  uniqueMediaImages,
} from "./mediaUtils";

describe("uniqueMediaImages", () => {
  it("keeps first-seen order and removes repeated hero images", () => {
    expect(uniqueMediaImages("hero.jpg", ["one.jpg", "hero.jpg", "two.jpg"]))
      .toEqual(["hero.jpg", "one.jpg", "two.jpg"]);
  });
});

describe("map URL helpers", () => {
  it("builds only an external search URL from unverified location text", () => {
    expect(buildMapsSearchUrl("Airport Road, Abuja"))
      .toBe("https://www.google.com/maps/search/?api=1&query=Airport%20Road%2C%20Abuja");
  });

  it("builds an approximate embed URL from unverified location text", () => {
    expect(buildApproximateMapUrl("Airport Road, Abuja"))
      .toBe("https://maps.google.com/maps?q=Airport%20Road%2C%20Abuja&z=13&output=embed");
  });

  it("builds an embed URL from validated verified coordinates and zoom", () => {
    expect(buildCoordinateMapUrl({ lat: 9.1, lng: 7.4, zoom: 15, label: "Hutu" }))
      .toContain("q=9.1%2C7.4");
  });

  it("rejects invalid latitude, longitude and zoom values", () => {
    expect(() => buildCoordinateMapUrl({ lat: 91, lng: 7.4, zoom: 15, label: "Hutu" }))
      .toThrow(RangeError);
    expect(() => buildCoordinateMapUrl({ lat: 9.1, lng: 181, zoom: 15, label: "Hutu" }))
      .toThrow(RangeError);
    expect(() => buildCoordinateMapUrl({ lat: 9.1, lng: 7.4, zoom: 0, label: "Hutu" }))
      .toThrow(RangeError);
  });
});
