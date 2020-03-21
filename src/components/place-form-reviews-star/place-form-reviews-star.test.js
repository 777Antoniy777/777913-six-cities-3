import React from 'react';
import renderer from "react-test-renderer";
import PlaceFormReviewsStar from "./place-form-reviews-star";

// set mocha data
const star = {
  id: 1,
  title: `perfect`,
};
const rating = false;

const handleInputChange = () => {};

it(`render PlaceFormReviews`, () => {
  const tree = renderer.create(
      <PlaceFormReviewsStar
        star={star}
        rating={rating}
        handleInputChange={handleInputChange}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
