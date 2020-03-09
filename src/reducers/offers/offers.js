import ActionType from '../../action-type';
import {extend} from "../../utils.js";
// import offersMock from '../../mocks/offers';

// const initialState = {
//   city: offersMock[0].city,
//   initialOffers: offersMock,
//   offers: offersMock.slice(),
// };

const initialState = {
  city: null,
  initialOffers: [],
  offers: [].slice(),
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case ActionType.GET_OFFERS:
      return extend(state, {
        initialOffers: action.payload,
        offers: action.payload,
        city: action.payload[0].city.name,
      });

    case ActionType.GET_CURRENT_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.SET_DEFAULT_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.SET_LOW_TO_HIGH_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.SET_HIGH_TO_LOW_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    case ActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS:
      return extend(state, {
        offers: action.payload,
      });

    default:
      return state;
  }
}
