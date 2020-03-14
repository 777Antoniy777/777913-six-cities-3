import React from 'react';
import renderer from "react-test-renderer";
import Map from './map';

// set mocha data
const map = React.createRef();

it(`render Map`, () => {
  const tree = renderer.create(
      <Map
        map={map}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
