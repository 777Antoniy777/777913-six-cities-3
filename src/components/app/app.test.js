import React from 'react';
import renderer from "react-test-renderer";
import App from './app';

// set mocha data
const rentAmount = 666;
const offers = [
  {
    id: 1,
    title: `title 1`,
    src: `img/image1`,
    price: 999999,
    type: `type`,
  },
];


it(`Should render App`, () => {
  const tree = renderer.create(
      <App
        rentAmount={ rentAmount }
        offers={ offers }
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
