import React from 'react';
import renderer from "react-test-renderer";
import PlaceItem from './place-items';

// set mocha data
const item = `item1`;

it(`render PlaceItem`, () => {
  const tree = renderer.create(
      <PlaceItem
        item={item}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
