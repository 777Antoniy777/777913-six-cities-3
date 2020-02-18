import React from 'react';
import renderer from "react-test-renderer";
import PlacePhotos from './place-photos';

// set mocha data
const photos = [
  `img/image1`,
  `img/image2`,
  `img/image3`,
];

let i = 0;

it(`render PlacePhotos`, () => {
  const tree = renderer.create(
      <PlacePhotos
        key={++i}
        photos={photos}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
