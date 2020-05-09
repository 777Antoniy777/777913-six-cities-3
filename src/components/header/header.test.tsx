import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Header from "./header";

// set mocha data
const authorizationStatus = `AUTH`;
const userData = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const location = {
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

