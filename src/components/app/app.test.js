import React from 'react';
import renderer from "react-test-renderer";
import App from './app';

// set mocha data
const rentAmount = 666;
const apartments = [
  {
    id: 1,
    title: `title 1`,
    src: `img/image1`,
    price: 999999,
    type: `type`,
  },
  {
    id: 2,
    title: `title 2`,
    src: `img/image1`,
    price: 0,
    type: `type`,
  },
];


it(`Should render App`, () => {
  const tree = renderer.create(
      <App
        rentAmount={ rentAmount }
        apartments={ apartments }
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
