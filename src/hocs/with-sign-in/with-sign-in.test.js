import React from 'react';
import renderer from "react-test-renderer";
import withSignIn from "./with-sign-in";

// set mocha data
const props = [];

const MockComponent = () => {
  return (
    <div></div>
  );
};

const SignInWrappedHoc = withSignIn(MockComponent);

it(`render withSignIn`, () => {
  const tree = renderer.create((
    <SignInWrappedHoc
      props={props}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
