import React from "react";
import renderer from "react-test-renderer";
import PreviewPlaces from "./preview-places";

// set mocha data
const offers = [
  {
    id: 1,
    title: `title 1`,
    src: `img/image1`,
    price: 999999,
    type: `type`,
  },
];

describe(`Should render Main`, () => {

  it(`Places should render full offers`, () => {
    const tree = renderer.create(
        <PreviewPlaces
          offers={ offers }
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Places should render empty offers`, () => {
    const tree = renderer.create(
        <PreviewPlaces
          offers={ [] }
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
