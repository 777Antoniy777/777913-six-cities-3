import React from 'react';
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Place from './place';

const mockStore = configureStore();

// set mocha data
const initialOffers = [
  {
    id: 1,
    city: `city`,
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
const offer = {
  id: 1,
  city: `city`,
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
const hoveredOffer = {
  id: 2,
  city: `city`,
  title: `title 1`,
  premium: false,
  src: `img/image1`,
  photos: [
    `img/image1`,
    `img/image2`,
  ],
  price: 100,
  description: `test`,
  type: `type`,
  rating: 500,
  bedroomAmount: 30,
  guestsAmount: 50,
  items: [`item`],
  host: {
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: true,
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
  coord: [2, 2],
};

const onGetCurrentOffer = () => {};

const store = mockStore({
  offer: {
    offer,
    hoveredOffer,
  },
  offers: {
    initialOffers,
  }
});

it(`render Place`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Place
          offers={initialOffers}
          offer={offer}
          hoveredOffer={hoveredOffer}
          onGetCurrentOffer={onGetCurrentOffer}
        />
      </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
