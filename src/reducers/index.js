import {combineReducers} from 'redux';
import offers from './offers/offers';
import offer from './offer/offer';
import reviews from "./reviews/reviews";
import user from "./user/user";
import userReview from "./user-review/user-review";

export default combineReducers({
  offers,
  offer,
  reviews,
  user,
  userReview,
});
