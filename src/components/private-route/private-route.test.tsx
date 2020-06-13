import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import PrivateRoute from "./private-route";

// set mocha data
const path = `path`;
const render = () => {
  return (
    <div></div>
  );
};
const authorizationStatus = `AUTH`;
const condRedirect = `address`;
const linkRedirect = `redirect`;

it(`render PrivateRoute`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <PrivateRoute
          path={path}
          render={render}
          authorizationStatus={authorizationStatus}
          condRedirect={condRedirect}
          linkRedirect={linkRedirect}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
