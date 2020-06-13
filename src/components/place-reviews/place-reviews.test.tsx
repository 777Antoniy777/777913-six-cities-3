import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceReviews from "./place-reviews";
import {Reviews} from "../../types/reviews-type";

// set mocha data
const reviews: Reviews = [
  {
    id: 1,
    user: {
      id: 1,
      status: false,
      name: `name`,
      avatar: `avatar`,
    },
    comment: `comment`,
    rating: 100,
    date: `date`,
  },
];

it(`render PlaceReviews`, () => {
  const tree = renderer.create(
      <PlaceReviews
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
