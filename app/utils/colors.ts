export const NEON_COLORS = [
  "#FF0055",
  "#00E0FF",
  "#F8FF00",
  "#9B00FF",
  "#00FF75",
  "#FF6B00",
  "#00FFDD",
  "#FF00FF",
  "#00B2FF",
  "#FFD300",
  "#4CFF00",
  "#FF0090",
  "#00FFC6",
  "#FF3D00",
  "#0090FF",
  "#FFE200",
  "#7700FF",
  "#56FFB2",
  "#FF9900",
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
