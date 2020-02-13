import React from "react";
import renderer from "react-test-renderer";
import Places from "../place/place";

// set mocha data
const apartments = [
  {
    id: 1,
    title: `title 1`,
    src: `img/image1`,
    price: 999999,
    type: `type`,
  },
];

describe(`Should render Main`, () => {

  it(`Places should render full apartments`, () => {
    const tree = renderer.create(
        <Places
          apartments={ apartments }
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Places should render empty apartments`, () => {
    const tree = renderer.create(
        <Places
          apartments={ [] }
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
