import {UserReviewActionType} from "../../actions/user-review/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  requestStatus: null,
  requestMessage: null,
  userReview: {},
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case UserReviewActionType.SET_USER_REVIEW_REQUEST_STATUS:
      return extend(state, {
        requestStatus: action.payload,
      });

    case UserReviewActionType.SET_USER_REVIEW_REQUEST_MESSAGE:
      return extend(state, {
        requestMessage: action.payload,
      });

    case UserReviewActionType.GET_USER_REVIEW:
      return extend(state, {
        userReview: action.payload,
      });

    default:
      return state;
  }
}
