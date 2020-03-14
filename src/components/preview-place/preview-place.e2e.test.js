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
const isShowOffer = true;

const store = mockStore({
  offer: {
    isShowOffer: false
  },
});

describe(`PreviewPlace should call correct callbacks`, () => {
  it(`"placeData" and status should set into callback after click on title`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const preventDefault = jest.fn();
    const getActiveItem = jest.fn((data) => data);
    const setOfferStatus = jest.fn((val) => val);
    const scrollTo = jest.fn();
    Object.defineProperty(global.window, `scrollTo`, {
      value: scrollTo
    });

    const previewPlace = mount(
        <Provider store={store}>
          <PreviewPlace
            placeData={placeData}
            isShowOffer={isShowOffer}
            getActiveItem={getActiveItem}
            setOfferStatus={setOfferStatus}
          />
        </Provider>
    );

    const title = previewPlace.find(`.place-card__name`);

    const mockClickEvent = ({
      preventDefault,
      getActiveItem() {},
      setOfferStatus: setOfferStatus(true),
    });

    title.simulate(`click`, mockClickEvent);

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(getActiveItem).toHaveBeenCalledTimes(1);
    expect(getActiveItem.mock.calls[0][0]).toMatchObject(placeData);
    expect(setOfferStatus).toHaveBeenCalledTimes(1);
    expect(setOfferStatus.mock.calls[0][0]).toBe(isShowOffer);
  });

  it(`"placeData" should set into callback after mouseenter on card`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const getHoveredOffer = jest.fn((data) => data);

    const previewPlace = mount(
        <Provider store={store}>
          <PreviewPlace
            placeData={placeData}
            isShowOffer={isShowOffer}
            getHoveredOffer={getHoveredOffer}
          />
        </Provider>
    );

    const card = previewPlace.find(`.place-card`);

    const mockMouseenterEvent = ({
      getHoveredOffer: getHoveredOffer(placeData),
    });

    card.simulate(`mouseenter`, mockMouseenterEvent);

    expect(getHoveredOffer).toHaveBeenCalledTimes(1);
    expect(getHoveredOffer.mock.calls[0][0]).toMatchObject(placeData);
  });

  it(`"null" should set into callback after mouseleave on card`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const removeHoveredOffer = jest.fn((val) => val);

    const previewPlace = mount(
        <Provider store={store}>
          <PreviewPlace
            placeData={placeData}
            isShowOffer={isShowOffer}
            removeHoveredOffer={removeHoveredOffer}
          />
        </Provider>
    );

    const card = previewPlace.find(`.place-card`);

    const mockMouseleaveEvent = ({
      onRemoveHoveredOffer: removeHoveredOffer(null),
    });

    card.simulate(`mouseleave`, mockMouseleaveEvent);

    expect(removeHoveredOffer).toHaveBeenCalledTimes(1);
    expect(removeHoveredOffer.mock.calls[0][0]).toBe(null);
  });
});
