import {OffersActionType} from "../../actions/offers/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  requestStatus: null,
  requestMessage: null,
  city: null,
  initialOffers: [],
  offers: [],
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case OffersActionType.SET_OFFERS_REQUEST_STATUS:
      return extend(state, {
        requestStatus: action.payload,
      });

    case OffersActionType.SET_OFFERS_REQUEST_MESSAGE:
      return extend(state, {
        requestMessage: action.payload,
      });

    case OffersActionType.GET_INITIAL_OFFERS:
      return extend(state, {
        initialOffers: action.payload,
      });

    case OffersActionType.GET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case OffersActionType.GET_INITIAL_CITY:
      return extend(state, {
        city: action.payload,
      });

    case OffersActionType.GET_CURRENT_CITY:
      return extend(state, {
        city: action.payload,
      });

    // case OffersActionType.GET_FAVORITE_OFFER:
    //   const offers = initialState.offers;
    //   console.log(offers);

    //   return extend(state, {
    //     offers: [action.payload],
    //     // offers: [...offers.slice(0, action.payload.id), action.payload, ...initialState.offers.slice(action.payload.id + 1)],
    //   });

    case OffersActionType.SET_DEFAULT_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    default:
      return state;
  }
}
