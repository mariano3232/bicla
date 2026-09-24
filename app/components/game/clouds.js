export const START_RIGHT = -40;

export const CLOUD_TYPES = [
  { src: "/nube.png", w: 46, h: 32 },
  { src: "/nubelluvia.png", w: 36, h: 36 },
];

export const BASE_CROSS_MS = 2500;
export const CLOUD_SPEED_RATIO = 0.35;

export function pickCloudType() {
  return CLOUD_TYPES[Math.floor(Math.random() * CLOUD_TYPES.length)];
}

export function cloudSpawnGapPx() {
  return 320 + Math.random() * 480;
}

export function cloudTopPx(type, maxHeight = 84) {
  return 12 + Math.random() * Math.max(0, maxHeight - type.h);
}

export function defaultCloudSpeed(containerWidth) {
  const travel = containerWidth - START_RIGHT;
  return (travel / BASE_CROSS_MS) * CLOUD_SPEED_RATIO;
}
