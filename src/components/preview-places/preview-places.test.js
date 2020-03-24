import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PreviewPlaces from "./preview-places";

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
const history = {};

const getActiveItem = () => {};

const store = mockStore({
  offer: {
    offer,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
  }
});


it(`render PreviewPlaces`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <PreviewPlaces
            offers={offers}
            history={history}
            getActiveItem={getActiveItem}
          />
        </Provider>
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
