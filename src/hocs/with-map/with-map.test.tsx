import * as React from "react";
import * as renderer from "react-test-renderer";
import withMap from "./with-map";

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

const MapWrappedHoc = withMap(MockComponent);

it(`render withMap`, () => {
  const tree = renderer.create(
      <MapWrappedHoc
        props={hockProps}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
