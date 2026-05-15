export function buildGoogleMapsEmbedUrl(latitude, longitude, zoom = 16) {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const z = Number(zoom) || 16;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${z}&output=embed`;
}

export function buildGoogleMapsOpenUrl(latitude, longitude, address = '') {
  const lat = Number(latitude);
  const lng = Number(longitude);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }
  return null;
}

export function buildGoogleMapsDirectionsUrl(latitude, longitude, address = '') {
  const lat = Number(latitude);
  const lng = Number(longitude);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }
  if (address) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  }
  return null;
}
