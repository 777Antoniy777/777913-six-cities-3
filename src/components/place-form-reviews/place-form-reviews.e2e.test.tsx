import * as React from "react";
import Enzyme, {shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceFormReviews from "./place-form-reviews";

Enzyme.configure({
  adapter: new Adapter(),
});

// set mocha data
const offerId = 1;
const review = `text`;
const rating: boolean[] = [false, false, false];
const submitButtonStatus = true;
const errors: string[] = [`error`];

describe(`PlaceFormReviews should call correct callbacks`, () => {
  it(`handler should call only 1 time after click on the form`, () => {
    const preventDefault = jest.fn();

    const placeFormReviews = shallow(
        <PlaceFormReviews
          offerId={offerId}
          review={review}
          rating={rating}
          submitButtonStatus={submitButtonStatus}
          errors={errors}
        />
    );

    const form = placeFormReviews.find(`.reviews__form`);

    const mockEvent = ({
      preventDefault,
    });

    form.simulate(`submit`, mockEvent);

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it(`handler should set "submitStatus" and call async action after click on the submit button`, () => {
    const onSetSubmitButtonStatus = jest.fn();
    const sendReview = jest.fn();
    const isCommentValid = jest.fn();
    const isStarChoose = jest.fn();

    const placeFormReviews = shallow(
        <PlaceFormReviews
          offerId={offerId}
          review={review}
          rating={rating}
          submitButtonStatus={submitButtonStatus}
          errors={errors}
          isCommentValid={isCommentValid}
          isStarChoose={isStarChoose}
          onSetSubmitButtonStatus={onSetSubmitButtonStatus}
          sendReview={sendReview}
        />
    );

    const submitButton = placeFormReviews.find(`.reviews__submit`);

    const mockEvent = ({
      isCommentValid() {},
      isStarChoose() {},
    });

    submitButton.simulate(`click`, mockEvent);

    expect(isCommentValid).toHaveBeenCalledTimes(1);
    expect(isCommentValid.mock.calls[0][0]).toBe(review);
    expect(isCommentValid.mock.calls[0][1]).toBe(true);
    expect(isStarChoose).toHaveBeenCalledTimes(1);
  });

  it(`handler should call only 1 time after change textarea`, () => {
    const handleInputChange = jest.fn();

    const placeFormReviews = shallow(
        <PlaceFormReviews
          offerId={offerId}
          review={review}
          rating={rating}
          submitButtonStatus={submitButtonStatus}
          errors={errors}
          handleInputChange={handleInputChange}
        />
    );

    const textarea = placeFormReviews.find(`.reviews__textarea`);

    const mockEvent = ({
      handleInputChange,
    });

    textarea.simulate(`change`, mockEvent);

    expect(handleInputChange).toHaveBeenCalledTimes(1);
  });
});
