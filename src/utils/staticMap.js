/**
 * Non-interactive OpenStreetMap static preview (no pan/zoom on site).
 */
export function buildStaticMapUrl(latitude, longitude, zoom = 16) {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const z = Number(zoom) || 16;

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${z}&size=1200x480&markers=${lat},${lng},red-pushpin`;
}
