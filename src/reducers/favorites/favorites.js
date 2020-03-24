import {FavoritesActionType} from "../../actions/favorites/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  requestStatus: null,
  requestMessage: null,
  favoriteOffer: null,
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case FavoritesActionType.SET_FAVORITE_REQUEST_STATUS:
      return extend(state, {
        requestStatus: action.payload,
      });

    case FavoritesActionType.SET_FAVORITE_REQUEST_MESSAGE:
      return extend(state, {
        requestMessage: action.payload,
      });

    case FavoritesActionType.GET_FAVORITE_OFFER:
      return extend(state, {
        favoriteOffer: action.payload,
      });

    default:
      return state;
  }
}
