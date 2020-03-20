import React from 'react';
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Place from './place';

import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import thunk from "redux-thunk";

const mockStore = configureStore();

// set mocha data
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
const hoveredOffer = {
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
const reviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `name`,
      comment: `comment`,
    },
    status: `status`,
  },
];
const reviewsRequestStatus = `status`;
const reviewsRequestMessage = `message`;
const authorizationStatus = `AUTH`;

const getCurrentOffer = () => {};
// const getReviewsOnGet = () => {};

const getReviewsOnGet = (dispatch) => ({
  getReviewsOnGet: (offerId) => () => {
    dispatch(jest.fn(offerId));
  }
});
const offerId = 1;
// const getReviewsOnPost = () => {};

const reviewsAsyncActionCreator = jest.fn();
const getReviewsOnPost = (offerId) => {
  reviewsAsyncActionCreator(offerId);
};

// const getReviewsOnPost = (dispatch, () => {}, api) => {};
// const api = createAPI(() => {});
// const apiMock = new MockAdapter(api);
// const dispatch = () => {};
// const getState = () => {};
// const getReviewsOnPost = () => (dispatch, getState, api) => {};

// apiMock
//   .onGet(`/comments/1`)
//   .reply(200, reviews);

const store = mockStore({
  offer: {
    offer,
    hoveredOffer,
  },
  offers: {
    initialOffers,
  },
  reviews: {
    requestStatus: null,
    requestMessage: null,
    reviews,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
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
          reviewsRequestStatus={reviewsRequestStatus}
          reviewsRequestMessage={reviewsRequestMessage}
          reviews={reviews}
          authorizationStatus={authorizationStatus}
          getCurrentOffer={getCurrentOffer}
          getReviewsOnGet={getReviewsOnGet}
          getReviewsOnPost={getReviewsOnPost}
        />
      </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
