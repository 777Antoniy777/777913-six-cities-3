import React from 'react';
import renderer from "react-test-renderer";
import PlaceItems from './place-items';

// set mocha data
const items = [
  `item-1`,
  `item-2`,
];

it(`render PlaceItems`, () => {
  const tree = renderer.create(
      <PlaceItems
        items={items}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
