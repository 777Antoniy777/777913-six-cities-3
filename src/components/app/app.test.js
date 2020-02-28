import React from 'react';
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from './app';

const mockStore = configureStore();

it(`render App`, () => {
  const store = mockStore({
    offer: {
      isShowOffer: false
    },
  });

  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
