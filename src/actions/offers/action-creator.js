const OffersActionType = {
  SET_OFFERS_REQUEST_STATUS: `SET_OFFERS_REQUEST_STATUS`,
  SET_OFFERS_REQUEST_MESSAGE: `SET_OFFERS_REQUEST_MESSAGE`,
  GET_INITIAL_OFFERS: `GET_INITIAL_OFFERS`,
  GET_OFFERS: `GET_OFFERS`,
  GET_NEARBY_OFFERS: `GET_NEARBY_OFFERS`,
  GET_INITIAL_CITY: `GET_INITIAL_CITY`,
  GET_CURRENT_CITY: `GET_CURRENT_CITY`,
  GET_FAVORITE_OFFER: `GET_FAVORITE_OFFER`,
  SET_DEFAULT_ORDER_OFFERS: `SET_DEFAULT_ORDER_OFFERS`,
  SET_LOW_TO_HIGH_ORDER_OFFERS: `SET_LOW_TO_HIGH_ORDER_OFFERS`,
  SET_HIGH_TO_LOW_ORDER_OFFERS: `SET_HIGH_TO_LOW_ORDER_OFFERS`,
  SET_TOP_RATED_FIRST_ORDER_OFFERS: `SET_TOP_RATED_FIRST_ORDER_OFFERS`,
};

const OffersActionCreator = {
  setOffersRequestStatus: (status) => ({
    type: OffersActionType.SET_OFFERS_REQUEST_STATUS,
    payload: status,
  }),

  setOffersRequestMessage: (message) => ({
    type: OffersActionType.SET_OFFERS_REQUEST_MESSAGE,
    payload: message,
  }),

  getInitialOffers: (offers) => ({
    type: OffersActionType.GET_INITIAL_OFFERS,
    payload: offers,
  }),

  getOffers: (offers) => ({
    type: OffersActionType.GET_OFFERS,
    payload: offers,
  }),

  getNearbyOffers: (offers) => ({
    type: OffersActionType.GET_NEARBY_OFFERS,
    payload: offers,
  }),

  getInitialCity: (city) => ({
    type: OffersActionType.GET_INITIAL_CITY,
    payload: city,
  }),

  getCurrentCity: (city) => ({
    type: OffersActionType.GET_CURRENT_CITY,
    payload: city,
  }),

  getFavoriteOffer: (offer) => ({
    type: OffersActionType.GET_FAVORITE_OFFER,
    payload: offer,
  }),

  setDefaultOrderOffers: (offers) => ({
    type: OffersActionType.SET_DEFAULT_ORDER_OFFERS,
    payload: offers,
  }),

  setLowToHighOrderOffers: (offers) => ({
    type: OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
    payload: offers,
  }),

  setHighToLowOrderOffers: (offers) => ({
    type: OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
    payload: offers,
  }),

  setTopRatedFirstOrderOffers: (offers) => ({
    type: OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
    payload: offers,
  }),
};

export {OffersActionType, OffersActionCreator};
