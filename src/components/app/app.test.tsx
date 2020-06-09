import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app";
import {Offer, Offers} from "../../types/main-types/offers-type";

const mockStore = configureStore();

// set mocha data
const hoveredOffer: Offer = {
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
};
const offers: Offers = [
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
const initialOffers: Offers = [
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
const authorizationStatus = `AUTH`;

const store = mockStore({
  offers: {
    city: `city`,
    initialOffers,
    offers,
  },
  offer: {
    hoveredOffer,
  },
  favorites: {
    requestStatus: null,
    requestMessage: null,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
  }
});

it(`render App`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <App
          authorizationStatus={authorizationStatus}
          getFavoriteOffers={() => null}
          getCurrentOffer={() => null}
          getReviews={() => null}
          getNearbyOffers={() => null}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
