export const getRating = (val) => {
  let ratingStars = Math.round(val);
  ratingStars = ratingStars * 20;

  return `${ratingStars}%`;
};

