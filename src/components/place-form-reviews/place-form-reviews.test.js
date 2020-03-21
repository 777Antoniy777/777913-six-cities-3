import React from 'react';
import renderer from "react-test-renderer";
import PlaceFormReviews from "./place-form-reviews";

// set mocha data
const offerId = 1;
const review = `text`;
const rating = [false, false, false];
const submitButtonStatus = true;
const errors = [`error`];

const getReviewsOnPost = () => {};
const onSetSubmitButtonStatus = () => {};
const isCommentValid = () => {};
const isStarChoose = () => {};
const handleInputChange = () => {};
const onClearForm = () => {};

it(`render PlaceFormReviews`, () => {
  const tree = renderer.create(
      <PlaceFormReviews
        offerId={offerId}
        review={review}
        rating={rating}
        submitButtonStatus={submitButtonStatus}
        errors={errors}
        getReviewsOnPost={getReviewsOnPost}
        onSetSubmitButtonStatus={onSetSubmitButtonStatus}
        isCommentValid={isCommentValid}
        isStarChoose={isStarChoose}
        handleInputChange={handleInputChange}
        onClearForm={onClearForm}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
