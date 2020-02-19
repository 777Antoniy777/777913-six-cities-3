import React from 'react';
import renderer from "react-test-renderer";
import Main from './main';

// set mocha data
const rentAmount = 666;
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
    coord: [1, 1],
  },
];

const onSetPlaceData = () => {};
const onSetPlaceStatus = () => {};

it(`render Main`, () => {
  const tree = renderer.create(
      <Main
        rentAmount={rentAmount}
        offers={offers}
        onSetPlaceData={onSetPlaceData}
        onSetPlaceStatus={onSetPlaceStatus}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
