import React from 'react';
import renderer from "react-test-renderer";
import withLoadData from "./with-load-data";

// set mocha data
const props = [];
const data = [
  {},
];
const offerId = 1;

const getData = () => {};

const MockComponent = () => {
  return (
    <div></div>
  );
};

const ComponentWrappedHOC = withLoadData(MockComponent);

it(`render withLoadData`, () => {
  const tree = renderer.create((
    <ComponentWrappedHOC
      props={props}
      offerId={offerId}
      getData={getData}
      data={data}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
