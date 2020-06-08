import * as React from "react";
import * as renderer from "react-test-renderer";
import FavoritesEmpty from "./favorites-empty";

it(`render FavoritesEmpty`, () => {
  const tree = renderer.create(<FavoritesEmpty />).toJSON();

  expect(tree).toMatchSnapshot();
});
