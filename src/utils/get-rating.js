export const getRating = (val) => {
  const RATING_STARS = Math.round(val) * 20;

  return `${RATING_STARS}%`;
};

