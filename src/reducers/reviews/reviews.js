import {ReviewsActionType} from "../../actions/reviews/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  requestStatus: null,
  requestMessage: null,
  reviews: [],
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case ReviewsActionType.SET_REVIEWS_REQUEST_STATUS:
      return extend(state, {
        requestStatus: action.payload,
      });

    case ReviewsActionType.SET_REVIEWS_REQUEST_MESSAGE:
      return extend(state, {
        requestMessage: action.payload,
      });

    case ReviewsActionType.GET_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });

    default:
      return state;
  }
}
