import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import createAPI from "../api";
import {AuthorizationStatus} from "../enums";
import {OffersAsyncActionCreator} from "../actions/offers/async-action-creator";
import {UserActionCreator} from "../actions/user/action-creator";
import {UserAsyncActionCreator} from "../actions/user/async-action-creator";

const onUnauthorized = () => {
  store.dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(OffersAsyncActionCreator.getOffers());
store.dispatch(UserAsyncActionCreator.checkUserStatus());

// store.subscribe(() => {
//   /* eslint-disable no-console */
//   console.log(`store was changed`, store.getState());
// });

export default store;

