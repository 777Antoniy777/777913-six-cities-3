import {combineReducers} from 'redux';
import offers from './offers/offers';
import offer from './offer/offer';
import comments from "./comments/comments";

export default combineReducers({
  offers,
  offer,
  comments,
});
