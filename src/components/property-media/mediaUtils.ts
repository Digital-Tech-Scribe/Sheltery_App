import type { MapCoordinates } from "../../types";

export function uniqueMediaImages(heroImage: string, galleryImages: string[]) {
  return Array.from(new Set([heroImage, ...galleryImages].filter(Boolean)));
}

export function buildMapsSearchUrl(location: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

export function buildApproximateMapUrl(location: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=13&output=embed`;
}

export function buildCoordinateMapUrl({ lat, lng, zoom }: MapCoordinates) {
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
    throw new RangeError("Map latitude must be between -90 and 90.");
  }

  if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
    throw new RangeError("Map longitude must be between -180 and 180.");
  }

  if (!Number.isFinite(zoom) || zoom < 1 || zoom > 21) {
    throw new RangeError("Map zoom must be between 1 and 21.");
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=${zoom}&output=embed`;
}
