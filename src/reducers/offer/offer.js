import ActionType from '../../action-type';
import {extend} from "../../utils.js";

const initialState = {
  offer: null,
  hoveredOffer: null,
  isShowOffer: false,
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case ActionType.GET_CURRENT_OFFER:
      return extend(state, {
        offer: action.payload,
      });

    case ActionType.GET_HOVERED_OFFER:
      return extend(state, {
        hoveredOffer: action.payload,
      });

    case ActionType.REMOVE_HOVERED_OFFER:
      return extend(state, {
        hoveredOffer: action.payload,
      });

    case ActionType.SET_OFFER_STATUS:
      return extend(state, {
        isShowOffer: action.payload,
      });

    default:
      return state;
  }
}
