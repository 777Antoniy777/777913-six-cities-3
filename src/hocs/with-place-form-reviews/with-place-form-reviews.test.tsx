import * as React from "react";
import * as renderer from "react-test-renderer";
import withPlaceFormReviews from "./with-place-form-reviews";

interface MockComponentProps {
  children: React.ReactNode;
}

// set mocha data
const hockProps = {};

const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const PlaceFormReviewsWrappedHOC = withPlaceFormReviews(MockComponent);

it(`render PlaceFormReviewsWrappedHOC`, () => {
  const tree = renderer.create(
      <PlaceFormReviewsWrappedHOC
        props={hockProps}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

