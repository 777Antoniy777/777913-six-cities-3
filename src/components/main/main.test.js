import React from 'react';
import renderer from "react-test-renderer";
import Main from './main';

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

describe(`Should render Main`, () => {

  it(`Main should render all options`, () => {
    const tree = renderer.create(
        <Main
          rentAmount={ rentAmount }
          apartments={ apartments }
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Main should render only rentAmount`, () => {
    const tree = renderer.create(
        <Main
          rentAmount={ rentAmount }
          apartments={ [] }
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
