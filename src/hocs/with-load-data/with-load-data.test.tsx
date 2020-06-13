import * as React from "react";
import * as renderer from "react-test-renderer";
import withLoadData from "./with-load-data";

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

const ComponentWrappedHOC = withLoadData(MockComponent);

it(`render withLoadData`, () => {
  const tree = renderer.create(
      <ComponentWrappedHOC
        props={hockProps}
        getData={() => null}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
