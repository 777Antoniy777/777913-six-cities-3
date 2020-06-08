import * as React from "react";
import * as renderer from "react-test-renderer";
import MainEmpty from "./main-empty";

it(`render MainEmpty`, () => {
  const tree = renderer.create(<MainEmpty />).toJSON();

  expect(tree).toMatchSnapshot();
});
