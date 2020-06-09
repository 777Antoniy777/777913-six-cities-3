import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceReviews from "./place-reviews";
import {TestReviews} from "../../types/test-types/reviews-test-type";

// set mocha data
const reviews: TestReviews = [
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
        reviews={reviews}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
