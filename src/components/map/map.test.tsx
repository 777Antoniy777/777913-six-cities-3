import * as React from "react";
import * as renderer from "react-test-renderer";
import Map from "./map";

// set mocha data
const map: React.RefObject<HTMLDivElement> = React.createRef();

it(`render Map`, () => {
  const tree = renderer.create(
      <Map
        map={map}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
