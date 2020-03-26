import React from 'react';
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
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
const cities = [
  `Moscow`,
  `Omsk`,
];
const currentCity = `city`;
const offersRequestStatus = `status`;
const offersRequestMessage = `message`;
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
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

it(`render Main`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Main
            offersRequestStatus={offersRequestStatus}
            offersRequestMessage={offersRequestMessage}
            offers={offers}
            initialOffers={initialOffers}
            filteredOffers={filteredOffers}
            currentCity={currentCity}
            cities={cities}
            authorizationStatus={authorizationStatus}
            userData={userData}
            history={history}
            location={location}
            getCurrentCity={getCurrentCity}
            getCurrentOffer={getCurrentOffer}
            setDefaultOrderOffers={setDefaultOrderOffers}
            setLowToHighOrderOffers={setLowToHighOrderOffers}
            setHighToLowOrderOffers={setHighToLowOrderOffers}
            setTopRatedFirstOrderOffers={setTopRatedFirstOrderOffers}
          />
        </Provider>
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});

