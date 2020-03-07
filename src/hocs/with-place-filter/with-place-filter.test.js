import React from 'react';
import renderer from "react-test-renderer";
import withPlaceFilter from "./with-place-filter";

// set mocha data
const props = [];
const onFilterOffers = () => {};

const MockComponent = () => {
  return (
    <div></div>
  );
};

const PlaceFilterWrapperHoc = withPlaceFilter(MockComponent);

it(`render withPlaceFilter`, () => {
  const tree = renderer.create((
    <PlaceFilterWrapperHoc
      props={props}
      onFilterOffers={onFilterOffers}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
