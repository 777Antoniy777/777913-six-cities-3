const OfferActionType = {
  GET_CURRENT_OFFER: `GET_CURRENT_OFFER`,
  GET_HOVERED_OFFER: `GET_HOVERED_OFFER`,
  REMOVE_HOVERED_OFFER: `REMOVE_HOVERED_OFFER`,
  SET_OFFER_STATUS: `SET_OFFER_STATUS`,
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

  setOfferStatus: (status) => ({
    type: OfferActionType.SET_OFFER_STATUS,
    payload: status,
  }),
};

export {OfferActionType, OfferActionCreator};
