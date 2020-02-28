import {combineReducers} from 'redux';
import offers from './offers/offers';
import offer from './offer/offer';

export default combineReducers({
  offers,
  offer,
});
