import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Header from "./header";

import {TestUser} from "../../types/test-types/user-test-type";

// set mocha data
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

it(`render Header`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Header
          authorizationStatus={authorizationStatus}
          userData={userData}
          location={location}
        />
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});

