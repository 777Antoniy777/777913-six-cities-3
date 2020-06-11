import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceFormReviewsStar from "./place-form-reviews-star";

type TestStar = {
  id: number;
  title: string;
}

// set mocha data
const star: TestStar = {
  id: 1,
  title: `perfect`,
};
const rating = false;

it(`render PlaceFormReviews`, () => {
  const tree = renderer.create(
      <PlaceFormReviewsStar
        star={star}
        rating={rating}
        handleInputChange={() => null}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
