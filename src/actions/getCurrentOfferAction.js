import ActionType from '../action-type';

const getCurrentOfferAction = (offer) => ({
  type: ActionType.GET_CURRENT_OFFER,
  payload: offer,
});

export default getCurrentOfferAction;
