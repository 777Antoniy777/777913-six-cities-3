import * as React from "react";
import * as renderer from "react-test-renderer";
import FavoriteCities from "./favorite-cities";
import {Offers} from "../../types/offers-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

// set mocha data
const favoriteOffers: Offers = [
  {
    id: 1,
    city: {
      name: `city`,
      location: {
        latitude: 20,
        longitude: 20,
        zoom: 20,
      },
    },
    title: `title 1`,
    premium: false,
    favorite: false,
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
      id: 1,
      avatar: `img/avatar-1.jpg`,
      name: `name`,
      status: false,
    },
    location: {
      latitude: 20,
      longitude: 20,
      zoom: 20,
    },
  },
];
const favoriteCities: string[] = [
  `Moscow`,
  `Omsk`,
];
const location: RouteLocation = {
  hash: `hash`,
  key: `key`,
  pathname: `/pathname`,
  search: `search`,
  state: `state`,
};
const history: RouteHistory = {
  action: `action`,
  block: () => null,
  createHref: () => null,
  go: () => null,
  goBack: () => null,
  goForward: () => null,
  length: 90,
  listen: () => null,
  location,
  push: () => null,
  replace: () => null,
};

it(`render FavoriteCities`, () => {
  const tree = renderer.create(
      <FavoriteCities
        favoriteOffers={favoriteOffers}
        favoriteCities={favoriteCities}
        history={history}
        location={location}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
