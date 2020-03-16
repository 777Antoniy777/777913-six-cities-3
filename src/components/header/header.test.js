import React from 'react';
import renderer from "react-test-renderer";
import Header from "./header";

// set mocha data
const authorizationStatus = `AUTH`;
const userData = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};

it(`render Header`, () => {
  const tree = renderer.create(
      <Header
        authorizationStatus={authorizationStatus}
        userData={userData}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});

