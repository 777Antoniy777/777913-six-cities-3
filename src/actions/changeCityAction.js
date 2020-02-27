import ActionType from '../action-type';

const changeCityAction = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city,
});

export default changeCityAction;
