import React from 'react';
import renderer from "react-test-renderer";
import FavoriteCities from "./favorite-cities";

// set mocha data
const favoriteOffers = [
  {
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
  },
];
const favoriteCities = [
  `Moscow`,
  `Omsk`,
];
const history = {};
const location = {
  pathname: `/pathname`,
};

const getCurrentOffer = () => {};

it(`render FavoriteCities`, () => {
  const tree = renderer.create(
      <FavoriteCities
        favoriteOffers={favoriteOffers}
        favoriteCities={favoriteCities}
        history={history}
        location={location}
        getCurrentOffer={getCurrentOffer}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
