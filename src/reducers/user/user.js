import {UserActionType} from "../../actions/user/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  authorizationStatus: null,
  userData: null,
};

export default function createState(state = initialState, action) {
  switch (action.type) {

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
