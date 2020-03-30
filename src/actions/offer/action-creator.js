const OfferActionType = {
  GET_CURRENT_OFFER: `GET_CURRENT_OFFER`,
  GET_HOVERED_OFFER: `GET_HOVERED_OFFER`,
  REMOVE_HOVERED_OFFER: `REMOVE_HOVERED_OFFER`,
  GET_FAVORITE_OFFER: `GET_FAVORITE_OFFER`,
};

const OfferActionCreator = {
  getCurrentOffer: (offer) => ({
    type: OfferActionType.GET_CURRENT_OFFER,
    payload: offer,
  }),

  getHoveredOffer: (offer) => ({
    type: OfferActionType.GET_HOVERED_OFFER,
    payload: offer,
  }),

  removeHoveredOffer: (offer) => ({
    type: OfferActionType.REMOVE_HOVERED_OFFER,
    payload: offer,
  }),

  getFavoriteOffer: (offer) => ({
    type: OfferActionType.GET_FAVORITE_OFFER,
    payload: offer,
  }),
};

export {OfferActionType, OfferActionCreator};
