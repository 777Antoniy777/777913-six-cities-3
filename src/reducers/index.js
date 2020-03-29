import {combineReducers} from "redux";
import offers from "./offers/offers";
import offer from "./offer/offer";
import reviews from "./reviews/reviews";
import user from "./user/user";
import favorites from "./favorites/favorites";

export default combineReducers({
  offers,
  offer,
  reviews,
  user,
  favorites,
});
