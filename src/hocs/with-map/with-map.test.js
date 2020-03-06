import React from 'react';
import renderer from "react-test-renderer";
import withMap from "./with-map";

// set mocha data
const map = React.createRef();
const props = [];

const MockComponent = () => {
  return (
    <div></div>
  );
};

const MapWrapperHoc = withMap(MockComponent);

it(`render withMap`, () => {
  const tree = renderer.create((
    <MapWrapperHoc
      props={props}
      map={map}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
