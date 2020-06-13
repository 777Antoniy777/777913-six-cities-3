import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";

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

const WithActiveItemHoc = withActiveItem(MockComponent);

it(`render withActiveItem`, () => {
  const tree = renderer.create(
      <WithActiveItemHoc
        props={hockProps}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
