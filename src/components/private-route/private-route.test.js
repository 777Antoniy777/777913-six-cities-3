import React from 'react';
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import PrivateRoute from "./private-route";

// set mocha data
const props = [];
const authorizationStatus = `AUTH`;
const condRedirect = `address`;
const linkRedirect = `redirect`;

const MockComponent = () => {
  return (
    <div></div>
  );
};

it(`render PrivateRoute`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <PrivateRoute
          props={props}
          component={MockComponent}
          authorizationStatus={authorizationStatus}
          condRedirect={condRedirect}
          linkRedirect={linkRedirect}
        />
      </BrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
