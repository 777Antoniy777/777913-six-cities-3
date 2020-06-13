import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceFormReviews from "./place-form-reviews";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

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

it(`render PlaceFormReviews`, () => {
  const tree = renderer.create(
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
        handleInputChange={() => null}
        onClearForm={() => null}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
