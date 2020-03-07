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
    const onGetActiveItem = jest.fn((data) => data);
    const onSetOfferStatus = jest.fn((val) => val);
    const scrollTo = jest.fn();
    Object.defineProperty(global.window, `scrollTo`, {
      value: scrollTo
    });

    const previewPlace = mount(
        <Provider store={store}>
          <PreviewPlace
            placeData={placeData}
            isShowOffer={isShowOffer}
            onGetActiveItem={onGetActiveItem}
            onSetOfferStatus={onSetOfferStatus}
          />
        </Provider>
    );

    const title = previewPlace.find(`.place-card__name`);

    const mockClickEvent = ({
      preventDefault,
      onGetActiveItem() {},
      onSetOfferStatus: onSetOfferStatus(true),
    });

    title.simulate(`click`, mockClickEvent);

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(onGetActiveItem).toHaveBeenCalledTimes(1);
    expect(onGetActiveItem.mock.calls[0][0]).toMatchObject(placeData);
    expect(onSetOfferStatus).toHaveBeenCalledTimes(1);
    expect(onSetOfferStatus.mock.calls[0][0]).toBe(isShowOffer);
  });

  it(`"placeData" should set into callback after mouseenter on card`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const onGetHoveredOffer = jest.fn((data) => data);

    const previewPlace = mount(
        <Provider store={store}>
          <PreviewPlace
            placeData={placeData}
            isShowOffer={isShowOffer}
            onGetHoveredOffer={onGetHoveredOffer}
          />
        </Provider>
    );

    const card = previewPlace.find(`.place-card`);

    const mockMouseenterEvent = ({
      onGetHoveredOffer: onGetHoveredOffer(placeData),
    });

    card.simulate(`mouseenter`, mockMouseenterEvent);

    expect(onGetHoveredOffer).toHaveBeenCalledTimes(1);
    expect(onGetHoveredOffer.mock.calls[0][0]).toMatchObject(placeData);
  });

  it(`"null" should set into callback after mouseleave on card`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const onRemoveHoveredOffer = jest.fn((val) => val);

    const previewPlace = mount(
        <Provider store={store}>
          <PreviewPlace
            placeData={placeData}
            isShowOffer={isShowOffer}
            onRemoveHoveredOffer={onRemoveHoveredOffer}
          />
        </Provider>
    );

    const card = previewPlace.find(`.place-card`);

    const mockMouseleaveEvent = ({
      onRemoveHoveredOffer: onRemoveHoveredOffer(null),
    });

    card.simulate(`mouseleave`, mockMouseleaveEvent);

    expect(onRemoveHoveredOffer).toHaveBeenCalledTimes(1);
    expect(onRemoveHoveredOffer.mock.calls[0][0]).toBe(null);
  });
});
