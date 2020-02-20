import React from 'react';
import renderer from "react-test-renderer";
import Place from './place';

// set mocha data
const placeData = {
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
};

it(`render Place`, () => {
  const tree = renderer.create(
      <Place
        placeData={placeData}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
