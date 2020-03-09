import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import createAPI from "../api";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    rootReducer,
    // composeWithDevTools(applyMiddleware(thunk))
    composeWithDevTools(thunk.withExtraArgument(api))
);

store.subscribe(() => {
  /* eslint-disable no-console */
  console.log(`store was changed`, store.getState());
});

export default store;

