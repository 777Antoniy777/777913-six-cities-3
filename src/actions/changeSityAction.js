import ActionType from '../action-type';

const changeSityAction = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city,
});

export default changeSityAction;
