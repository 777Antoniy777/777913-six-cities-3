import React from "react";
import renderer from "react-test-renderer";
import PreviewPlaces from "./preview-places";

// set mocha data
const offer = {
  id: 1,
  city: {
    id: 1,
    name: `city`,
    coords: [1, 1],
  },
  title: `title 1`,
  premium: false,
  src: `img/image1`,
  photos: [`img/image1`],
  price: 999999,
  description: `test`,
  type: `type`,
  rating: 9999,
  bedroomAmount: 30,
  guestsAmount: 50,
  items: [`item`],
  host: {
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  reviews: [
    {
      id: 1,
      body: `text`,
      rating: 5,
      name: `name`,
      date: `date`,
    },
  ],
  coord: [1, 1],
};
const history = {};
const location = {
  pathname: `/pathname`,
};

const getActiveItem = () => {};

it(`render PreviewPlaces`, () => {
  const tree = renderer.create(
      <PreviewPlaces
        offer={offer}
        history={history}
        location={location}
        getActiveItem={getActiveItem}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
