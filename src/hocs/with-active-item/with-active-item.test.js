import React from 'react';
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

// set mocha data
const props = [];
const getActiveItem = () => {};

const MockComponent = () => {
  return (
    <div></div>
  );
};

const WithActiveItemHoc = withActiveItem(MockComponent);

it(`render withActiveItem`, () => {
  const tree = renderer.create((
    <WithActiveItemHoc
      props={props}
      getActiveItem={getActiveItem}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
