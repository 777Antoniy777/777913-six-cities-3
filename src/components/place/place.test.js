import React from 'react';
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Place} from './place';

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
const userData = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const history = {};
const location = {
  pathname: `/pathname`,
};

const getCurrentOffer = () => {};
const sendReview = () => {};

const store = mockStore({
  offers: {
    initialOffers,
  },
  offer: {
    offer,
    hoveredOffer,
  },
  reviews: {
    requestStatus: null,
    requestMessage: null,
    reviews,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

it(`render Place`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Place
            offers={initialOffers}
            offer={offer}
            hoveredOffer={hoveredOffer}
            reviewsRequestStatus={reviewsRequestStatus}
            reviewsRequestMessage={reviewsRequestMessage}
            reviews={reviews}
            authorizationStatus={authorizationStatus}
            userData={userData}
            history={history}
            location={location}
            getCurrentOffer={getCurrentOffer}
            sendReview={sendReview}
          />
        </Provider>
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
