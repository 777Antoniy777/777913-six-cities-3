const getShowOfferStatus = (state) => {
  return state.offer.isShowOffer;
};

const getOffer = (state) => {
  return state.offer.offer;
};

const getHoveredOffer = (state) => {
  return state.offer.hoveredOffer;
};

export {getShowOfferStatus, getOffer, getHoveredOffer};
