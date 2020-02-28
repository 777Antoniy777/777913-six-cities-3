import ActionType from '../action-type';

const setOfferStatusAction = (status) => ({
  type: ActionType.SET_OFFER_STATUS,
  payload: status,
});

export default setOfferStatusAction;
