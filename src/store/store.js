import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import createAPI from "../api";
import {OffersAsyncActionCreator} from "../actions/offers/async-action-creator";

// const onUnauthorized = () => {
//   store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
// };

// const api = createAPI(onUnauthorized);
const api = createAPI();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(OffersAsyncActionCreator.getOffers());

store.subscribe(() => {
  /* eslint-disable no-console */
  console.log(`store was changed`, store.getState());
});

export default store;

