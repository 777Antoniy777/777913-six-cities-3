import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PreviewPlace from "./preview-place";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore();

// set mocha data
const placeData = {
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

const store = mockStore({
  offer: {
    isShowOffer: false
  },
});

it(`placeData and status should set into callback after click on title`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const onGetCurrentOffer = jest.fn((data) => data);
  const onSetOfferStatus = jest.fn();
  const scrollTo = jest.fn();
  Object.defineProperty(global.window, `scrollTo`, {
    value: scrollTo
  });

  let previewPlace = mount(
      <Provider store={store}>
        <PreviewPlace
          placeData={placeData}
          onGetCurrentOffer={onGetCurrentOffer}
          onSetOfferStatus={onSetOfferStatus}
        />
      </Provider>
  );

  const card = previewPlace.find(`.place-card__name`);
  card.simulate(`click`, {
    preventDefault() {},
    onGetCurrentOffer() {},
    onSetOfferStatus() {}
  });

  expect(scrollTo).toHaveBeenCalledWith(0, 0);
  expect(onGetCurrentOffer).toHaveBeenCalledTimes(1);
  expect(onGetCurrentOffer.mock.calls[0][0]).toMatchObject(placeData);
  expect(onSetOfferStatus).toHaveBeenCalledTimes(1);
});
