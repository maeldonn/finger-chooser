export const NEON_COLORS = [
  "#FF0055",
  "#00FFDD",
  "#0080FF",
  "#FFFF00",
  "#FF00FF",
];

export const getFingerColor = (index: number): string => {
  return NEON_COLORS[index % NEON_COLORS.length];
};

export const getUniqueFingerColor = (
  usedColors: Iterable<string>,
  fallbackIndex: number
): string => {
  const used = new Set(usedColors);

  for (const color of NEON_COLORS) {
    if (!used.has(color)) {
      return color;
    }
  }

  return getFingerColor(fallbackIndex);
};
