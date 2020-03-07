import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PreviewPlaces from "./preview-places";

const mockStore = configureStore();

// set mocha data
const offers = [
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

const onGetActiveItem = () => {};

const store = mockStore({
  offer: {
    isShowOffer: false,
  },
  offers: {
    offers,
  }
});


it(`render PreviewPlaces`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <Provider store={store}>
        <PreviewPlaces
          offers={offers}
          onGetActiveItem={onGetActiveItem}
        />
      </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
