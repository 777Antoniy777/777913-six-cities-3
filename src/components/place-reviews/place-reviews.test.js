import React from 'react';
import renderer from "react-test-renderer";
import PlaceReviews from './place-reviews';

// set mocha data
const reviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `name`,
      comment: `comment`,
    },
    status: `status`,
  },
];

it(`render PlaceReviews`, () => {
  const tree = renderer.create(
      <PlaceReviews
        data={reviews}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
