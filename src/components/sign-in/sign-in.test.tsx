import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "./sign-in";
import {TestUser} from "../../types/test-types/user-test-type";
import {TestRouteLocation} from "../../types/test-types/location-test-type";

const mockStore = configureStore();

// set mocha data
const email = `email`;
const password = `password`;
const authorizationStatus = `AUTH`;
const userData: TestUser = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const location: TestRouteLocation = {
  pathname: `/pathname`,
};

const onInputChange = () => ({});
const isFieldEmpty = () => ({});
const isEmailValid = () => ({});
const login = () => ({});

const store = mockStore({
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

it(`render SignIn`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn
            email={email}
            password={password}
            login={login}
            location={location}
            authorizationStatus={authorizationStatus}
            userData={userData}
            onInputChange={onInputChange}
            isFieldEmpty={isFieldEmpty}
            isEmailValid={isEmailValid}
          />
        </Provider>
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
