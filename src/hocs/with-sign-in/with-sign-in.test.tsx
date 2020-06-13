import * as React from "react";
import * as renderer from "react-test-renderer";
import withSignIn from "./with-sign-in";

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

const SignInWrappedHoc = withSignIn(MockComponent);

it(`render withSignIn`, () => {
  const tree = renderer.create(
      <SignInWrappedHoc
        props={hockProps}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
