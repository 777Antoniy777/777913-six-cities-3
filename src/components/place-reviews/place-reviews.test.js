import React from 'react';
import renderer from "react-test-renderer";
import PlaceReviews from './place-reviews';

// set mocha data
const reviews = [
  {
    id: 1,
    body: `text`,
    rating: 5,
    name: `name`,
    date: `date`,
  },
];

it(`render PlaceReviews`, () => {
  const tree = renderer.create(
      <PlaceReviews
        reviews={reviews}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
