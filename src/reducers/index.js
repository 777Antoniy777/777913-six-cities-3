import {combineReducers} from 'redux';
import offers from './offers/offers';
import offer from './offer/offer';
import reviews from "./reviews/reviews";

export default combineReducers({
  offers,
  offer,
  reviews,
});
