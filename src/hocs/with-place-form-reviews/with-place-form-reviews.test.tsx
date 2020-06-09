import * as React from "react";
import * as renderer from "react-test-renderer";
import withPlaceFormReviews from "./with-place-form-reviews";

// set mocha data
const props = [];

const MockComponent = () => {
  return (
    <div></div>
  );
};

const PlaceFormReviewsWrappedHOC = withPlaceFormReviews(MockComponent);

it(`render PlaceFormReviewsWrappedHOC`, () => {
  const tree = renderer.create((
    <PlaceFormReviewsWrappedHOC
      props={props}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

