export const getBadgeLabel = (variation: number): string | null => {
  if (variation >= 10) return "+10% 🔥";
  if (variation <= -10) return "Drop 🚨";
  return null;
};
