import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import NotFound from "./not-found";

it(`render NotFound`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
