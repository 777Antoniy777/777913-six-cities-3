import {OfferActionType} from "../../actions/offer/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  offer: null,
  hoveredOffer: null,
  isShowOffer: false,
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case OfferActionType.GET_CURRENT_OFFER:
      return extend(state, {
        offer: action.payload,
      });

    case OfferActionType.GET_HOVERED_OFFER:
      return extend(state, {
        hoveredOffer: action.payload,
      });

    case OfferActionType.REMOVE_HOVERED_OFFER:
      return extend(state, {
        hoveredOffer: action.payload,
      });

    case OfferActionType.SET_OFFER_STATUS:
      return extend(state, {
        isShowOffer: action.payload,
      });

    default:
      return state;
  }
}
