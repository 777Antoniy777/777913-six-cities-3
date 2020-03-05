import ActionType from '../action-type';

const ActionCreator = {
  getCurrentCityAction: (city) => ({
    type: ActionType.GET_CURRENT_CITY,
    payload: city,
  }),

  getCurrentOfferAction: (offer) => ({
    type: ActionType.GET_CURRENT_OFFER,
    payload: offer,
  }),

  // getActiveItemAction: (offer) => ({
  //   type: ActionType.GET_ACTIVE_ITEM,
  //   payload: offer,
  // }),

  getHoveredOfferAction: (offer) => ({
    type: ActionType.GET_HOVERED_OFFER,
    payload: offer,
  }),

  removeHoveredOfferAction: (offer) => ({
    type: ActionType.REMOVE_HOVERED_OFFER,
    payload: offer,
  }),

  setOfferStatusAction: (status) => ({
    type: ActionType.SET_OFFER_STATUS,
    payload: status,
  }),

  setDefaultOrderOffers: (offers) => ({
    type: ActionType.SET_DEFAULT_ORDER_OFFERS,
    payload: offers,
  }),

  setLowToHighOrderOffers: (offers) => ({
    type: ActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
    payload: offers,
  }),

  setHighToLowOrderOffers: (offers) => ({
    type: ActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
    payload: offers,
  }),

  setTopRatedFirstOrderOffers: (offers) => ({
    type: ActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
    payload: offers,
  }),
};

export default ActionCreator;
