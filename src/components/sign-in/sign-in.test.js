import React from 'react';
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "./sign-in";

const mockStore = configureStore();

// set mocha data
const email = `email`;
const password = `password`;

const onInputChange = () => {};
const isFieldEmpty = () => {};
const isEmailValid = () => {};
const login = () => {};

const store = mockStore({});

it(`render SignIn`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <Provider store={store}>
        <SignIn
          email={email}
          password={password}
          onInputChange={onInputChange}
          isFieldEmpty={isFieldEmpty}
          isEmailValid={isEmailValid}
          login={login}
        />
      </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
