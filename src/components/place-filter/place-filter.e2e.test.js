import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlaceFilter from "./place-filter";

Enzyme.configure({
  adapter: new Adapter(),
});

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

const store = mockStore({
  offers: {
    initialOffers: offers,
    offers,
  },
});

describe(`PlaceFilter should call correct callbacks`, () => {
  it(`handler should call only 1 time after click on filter caption`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const setFilterStatus = jest.fn();

    const placeFilter = mount(
        <Provider store={store}>
          <PlaceFilter
            initialOffers={initialOffers}
            offers={offers}
          />
        </Provider>
    );

    const filterCaption = placeFilter.find(`.places__sorting-caption`);

    const mockEvent = ({
      setFilterStatus: setFilterStatus(),
    });

    filterCaption.simulate(`click`, mockEvent);

    expect(setFilterStatus).toHaveBeenCalledTimes(1);
  });

  it(`handler should call only 1 time after click on filter span`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const setFilterStatus = jest.fn();

    const placeFilter = mount(
        <Provider store={store}>
          <PlaceFilter
            initialOffers={initialOffers}
            offers={offers}
          />
        </Provider>
    );

    const filterSpan = placeFilter.find(`.places__sorting-type`);

    const mockEvent = ({
      setFilterStatus: setFilterStatus(),
    });

    filterSpan.simulate(`click`, mockEvent);

    expect(setFilterStatus).toHaveBeenCalledTimes(1);
  });
});
