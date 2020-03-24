const getOffer = (state) => {
  return state.offer.offer;
};

const getHoveredOffer = (state) => {
  return state.offer.hoveredOffer;
};

export {getOffer, getHoveredOffer};
