import React from 'react';
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message";

// set mocha data
const requestMessage = `message`;
const wrapperStyle = {};
const messageStyle = {};

it(`render ErrorMessage`, () => {
  const tree = renderer.create(
      <ErrorMessage
        requestMessage={requestMessage}
        wrapperStyle={wrapperStyle}
        messageStyle={messageStyle}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
