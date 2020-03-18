import {ReviewsActionType} from "../../actions/reviews/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  requestStatus: null,
  requestMessage: null,
  reviews: [],
  submitButtonStatus: true,
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

    case ReviewsActionType.SET_SUBMIT_BUTTON_STATUS:
      return extend(state, {
        submitButtonStatus: action.payload,
      });

    default:
      return state;
  }
}
