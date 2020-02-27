import ActionType from '../action-type';

const setShowOfferStatusAction = (status) => ({
  type: ActionType.SET_OFFER_STATUS,
  payload: status,
});

export default setShowOfferStatusAction;
