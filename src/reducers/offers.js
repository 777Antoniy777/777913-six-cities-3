import ActionType from '../action-type';
import {extend} from "../utils.js";
import offers from '../mocks/offers';

const initialState = {
  city: offers[0].city,
  offers,
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    default:
      return state;
  }
}
