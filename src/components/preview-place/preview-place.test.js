import React from 'react';
import renderer from "react-test-renderer";
import PreviewPlace from "./preview-place";

// set mocha data
const data = {
  id: 1,
  title: `title 1`,
  src: `img/image1`,
  price: 999999,
  type: `type`,
};

const {id, title, src, price, type} = data;

const onSetData = () => {};

it(`Place should render option`, () => {
  const tree = renderer.create(
      <PreviewPlace
        key= { id }
        title={ title }
        src={ src }
        price={ price }
        type={ type }
        onSetData={ onSetData }
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
