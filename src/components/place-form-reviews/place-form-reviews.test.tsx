import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceFormReviews from "./place-form-reviews";

// set mocha data
const offerId = 1;
const review = `text`;
const rating: boolean[] = [false, false, false];
const submitButtonStatus = true;
const errors: string[] = [`error`];

const sendReview = () => ({});
const onSetSubmitButtonStatus = () => ({});
const isCommentValid = () => ({});
const isStarChoose = () => ({});
const handleInputChange = () => ({});
const onClearForm = () => ({});

it(`render PlaceFormReviews`, () => {
  const tree = renderer.create(
      <PlaceFormReviews
        offerId={offerId}
        review={review}
        rating={rating}
        submitButtonStatus={submitButtonStatus}
        errors={errors}
        sendReview={sendReview}
        onSetSubmitButtonStatus={onSetSubmitButtonStatus}
        isCommentValid={isCommentValid}
        isStarChoose={isStarChoose}
        handleInputChange={handleInputChange}
        onClearForm={onClearForm}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
