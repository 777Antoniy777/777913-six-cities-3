import * as React from "react";
import * as renderer from "react-test-renderer";
import PlacePhotos from "./place-photos";

// set mocha data
const photos: string[] = [
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
