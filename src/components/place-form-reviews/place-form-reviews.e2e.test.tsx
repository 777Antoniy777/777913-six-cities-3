import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceFormReviews from "./place-form-reviews";
import {RouteHistory} from "../../types/main-types/history-type";
import {RouteLocation} from "../../types/main-types/location-type";

configure({adapter: new Adapter()});

// set mocha data
const offerId = 1;
const authorizationStatus = `status`;
const review = `text`;
const rating: boolean[] = [
  false,
  false,
  false
];
const submitButtonStatus = true;
const errors: string[] = [
  `error`
];
const location: RouteLocation = {
  hash: `hash`,
  key: `key`,
  pathname: `/pathname`,
  search: `search`,
  state: `state`,
};
const history: RouteHistory = {
  action: `action`,
  block: () => null,
  createHref: () => null,
  go: () => null,
  goBack: () => null,
  goForward: () => null,
  length: 90,
  listen: () => null,
  location,
  push: () => null,
  replace: () => null,
};

describe(`PlaceFormReviews should call correct functions`, () => {
  it(`function should set "submitStatus" in arguments and call async action after click on the submit button`, () => {
    const isCommentValid = jest.fn();
    const isStarChoose = jest.fn();

    const placeFormReviews = shallow(
        <PlaceFormReviews
          offerId={offerId}
          review={review}
          rating={rating}
          authorizationStatus={authorizationStatus}
          submitButtonStatus={submitButtonStatus}
          errors={errors}
          history={history}
          sendReview={() => null}
          onSetSubmitButtonStatus={() => null}
          isCommentValid={isCommentValid}
          isStarChoose={isStarChoose}
          handleInputChange={() => null}
          onClearForm={() => null}
        />
    );

    const submitButton = placeFormReviews.find(`.reviews__submit`);

    const mockEvent = {
      preventDefault: () => null,
    };

    submitButton.simulate(`click`, mockEvent);

    expect(isCommentValid).toHaveBeenCalledTimes(1);
    expect(isCommentValid.mock.calls[0][0]).toBe(review);
    expect(isCommentValid.mock.calls[0][1]).toBe(true);
    expect(isStarChoose).toHaveBeenCalledTimes(1);
  });

  it(`function should be called only 1 time after change textarea`, () => {
    const handleInputChange = jest.fn();

    const placeFormReviews = shallow(
        <PlaceFormReviews
          offerId={offerId}
          review={review}
          rating={rating}
          authorizationStatus={authorizationStatus}
          submitButtonStatus={submitButtonStatus}
          errors={errors}
          history={history}
          sendReview={() => null}
          onSetSubmitButtonStatus={() => null}
          isCommentValid={() => null}
          isStarChoose={() => null}
          handleInputChange={handleInputChange}
          onClearForm={() => null}
        />
    );

    const textarea = placeFormReviews.find(`.reviews__textarea`);

    const mockEvent = {
      preventDefault: () => null,
    };

    textarea.simulate(`change`, mockEvent);

    expect(handleInputChange).toHaveBeenCalledTimes(1);
  });
});
