import React from 'react';
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from './main';

const mockStore = configureStore();

// set mocha data
const offers = [
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
const initialOffers = [
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
const filteredOffers = [
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
const currentCity = `city`;
const requestStatus = `status`;
const requestMessage = `message`;

const getCities = () => {};
const getCurrentCity = () => {};
const getCurrentOffer = () => {};
const setDefaultOrderOffers = () => {};
const setLowToHighOrderOffers = () => {};
const setHighToLowOrderOffers = () => {};
const setTopRatedFirstOrderOffers = () => {};

const store = mockStore({
  offers: {
    requestStatus: null,
    requestMessage: null,
    city: `city`,
    initialOffers,
    offers,
  },
  offer: {
    isShowOffer: false,
  }
});

it(`render Main`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Main
          requestStatus={requestStatus}
          requestMessage={requestMessage}
          offers={offers}
          initialOffers={initialOffers}
          filteredOffers={filteredOffers}
          currentCity={currentCity}
          getCities={getCities}
          getCurrentCity={getCurrentCity}
          getCurrentOffer={getCurrentOffer}
          setDefaultOrderOffers={setDefaultOrderOffers}
          setLowToHighOrderOffers={setLowToHighOrderOffers}
          setHighToLowOrderOffers={setHighToLowOrderOffers}
          setTopRatedFirstOrderOffers={setTopRatedFirstOrderOffers}
        />
      </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});

