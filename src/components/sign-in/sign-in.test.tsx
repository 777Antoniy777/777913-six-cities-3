import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "./sign-in";
import {User} from "../../types/main-types/user-type";
import {RouteLocation} from "../../types/main-types/location-type";

const mockStore = configureStore();

// set mocha data
const email = `email`;
const password = `password`;
const authorizationStatus = `AUTH`;
const userData: User = {
  id: 1,
  email: `email`,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const location: RouteLocation = {
  hash: `hash`,
  key: `key`,
  pathname: `/pathname`,
  search: `search`,
  state: `state`,
};

const store = mockStore({
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

it(`render SignIn`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <SignIn
            email={email}
            password={password}
            login={() => null}
            location={location}
            authorizationStatus={authorizationStatus}
            userData={userData}
            onInputChange={() => null}
            isFieldEmpty={() => null}
            isEmailValid={() => null}
          />
        </Provider>
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
