import React from 'react';
import renderer from "react-test-renderer";
import Map from './map';

// set mocha data
const offers = [
  {
    id: 1,
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
  },
];
const activeCoords = [1, 1];

it(`render Map`, () => {
  const tree = renderer.create(
      <Map
        offers={offers}
        activeCoords={activeCoords}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
