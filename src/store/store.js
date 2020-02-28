import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  /* eslint-disable no-console */
  console.log(`store was changed`, store.getState());
});

export default store;

