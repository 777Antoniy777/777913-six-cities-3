import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Header from "./header";
import {User} from "../../types/user-type";
import {RouteLocation} from "../../types/location-type";

// set mocha data
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

it(`render Header`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Header
          authorizationStatus={authorizationStatus}
          userData={userData}
          location={location}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

