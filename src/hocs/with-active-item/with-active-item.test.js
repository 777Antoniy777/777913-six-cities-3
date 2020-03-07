import React from 'react';
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

// set mocha data
const props = [];
const onGetActiveItem = () => {};

const MockComponent = () => {
  return (
    <div></div>
  );
};

const MapWrapperHoc = withActiveItem(MockComponent);

it(`render withActiveItem`, () => {
  const tree = renderer.create((
    <MapWrapperHoc
      props={props}
      onGetActiveItem={onGetActiveItem}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
