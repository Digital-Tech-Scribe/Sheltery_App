import { describe, expect, it } from "vitest";
import { properties } from "./properties";

describe("Hutu Exclusive map data", () => {
  it("marks the estate location as unverified until exact coordinates are confirmed", () => {
    const hutu = properties.find((property) => property.slug === "hutu-exclusive");

    expect(hutu?.map).toEqual({
      state: "unverified",
      fallbackLabel: "Exact Hutu Exclusive estate coordinates are being verified.",
    });
  });
});
