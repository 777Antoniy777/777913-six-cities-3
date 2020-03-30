import {UserActionType} from "../../actions/user/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  requestStatus: null,
  requestMessage: null,
  authorizationStatus: null,
  userData: null,
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case UserActionType.SET_USER_REQUEST_STATUS:
      return extend(state, {
        requestStatus: action.payload,
      });

    case UserActionType.SET_USER_REQUEST_MESSAGE:
      return extend(state, {
        requestMessage: action.payload,
      });

    case UserActionType.SET_AUTHORIZATION_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case UserActionType.GET_USER_DATA:
      return extend(state, {
        userData: action.payload,
      });

    default:
      return state;
  }
}
