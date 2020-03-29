import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {PreviewPlace} from "./preview-place";

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
const authorizationStatus = `AUTH`;
const favoritesRequestStatus = `status`;
const favoritesRequestMessage = `message`;
const history = {
  push: jest.fn()
};
const location = {
  pathname: `/pathname`,
};

const getReviews = () => {};
const getNearbyOffers = () => {};

const store = mockStore({
  favorites: {
    requestStatus: null,
    requestMessage: null,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
  }
});

describe(`PreviewPlace should call correct callbacks`, () => {
  it(`"placeData" and status should set into callback after click on title`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const preventDefault = jest.fn();
    const getActiveItem = jest.fn((data) => data);
    const scrollTo = jest.fn();
    Object.defineProperty(global.window, `scrollTo`, {
      value: scrollTo
    });

    const previewPlace = mount(
        <BrowserRouter>
          <Provider store={store}>
            <PreviewPlace
              placeData={placeData}
              authorizationStatus={authorizationStatus}
              favoritesRequestStatus={favoritesRequestStatus}
              favoritesRequestMessage={favoritesRequestMessage}
              history={history}
              location={location}
              getActiveItem={getActiveItem}
              getReviews={getReviews}
              getNearbyOffers={getNearbyOffers}
            />
          </Provider>
        </BrowserRouter>
    );

    const title = previewPlace.find(`.place-card__name`);

    const mockClickEvent = ({
      preventDefault,
      getActiveItem() {},
    });

    title.simulate(`click`, mockClickEvent);

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(getActiveItem).toHaveBeenCalledTimes(1);
    expect(getActiveItem.mock.calls[0][0]).toMatchObject(placeData);
  });

  it(`"placeData" should set into callback after mouseenter on card`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const getHoveredOffer = jest.fn((data) => data);

    const previewPlace = mount(
        <BrowserRouter>
          <Provider store={store}>
            <PreviewPlace
              placeData={placeData}
              authorizationStatus={authorizationStatus}
              favoritesRequestStatus={favoritesRequestStatus}
              favoritesRequestMessage={favoritesRequestMessage}
              history={history}
              location={location}
              getHoveredOffer={getHoveredOffer}
              getReviews={getReviews}
              getNearbyOffers={getNearbyOffers}
            />
          </Provider>
        </BrowserRouter>
    );

    const card = previewPlace.find(`.place-card`);

    const mockMouseenterEvent = ({
      getHoveredOffer() {},
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
        <BrowserRouter>
          <Provider store={store}>
            <PreviewPlace
              placeData={placeData}
              authorizationStatus={authorizationStatus}
              favoritesRequestStatus={favoritesRequestStatus}
              favoritesRequestMessage={favoritesRequestMessage}
              history={history}
              location={location}
              removeHoveredOffer={removeHoveredOffer}
              getReviews={getReviews}
              getNearbyOffers={getNearbyOffers}
            />
          </Provider>
        </BrowserRouter>
    );

    const card = previewPlace.find(`.place-card`);

    const mockMouseleaveEvent = ({
      removeHoveredOffer() {},
    });

    card.simulate(`mouseleave`, mockMouseleaveEvent);

    expect(removeHoveredOffer).toHaveBeenCalledTimes(1);
    expect(removeHoveredOffer.mock.calls[0][0]).toBe(null);
  });

  it(`callback should call with favorite status and id after click on the favorite button`, () => {
    beforeEach(() => { // Runs before each test in the suite
      store.clearActions();
    });

    const {id} = placeData;
    const setFavoriteStatus = jest.fn((val) => val);

    const previewPlace = mount(
        <BrowserRouter>
          <Provider store={store}>
            <PreviewPlace
              placeData={placeData}
              authorizationStatus={authorizationStatus}
              favoritesRequestStatus={favoritesRequestStatus}
              favoritesRequestMessage={favoritesRequestMessage}
              history={history}
              location={location}
              setFavoriteStatus={setFavoriteStatus}
              getReviews={getReviews}
              getNearbyOffers={getNearbyOffers}
            />
          </Provider>
        </BrowserRouter>
    );

    const favoriteButton = previewPlace.find(`.place-card__bookmark-button`);

    const mockClickEvent = ({
      setFavoriteStatus() {},
    });

    favoriteButton.simulate(`click`, mockClickEvent);

    expect(setFavoriteStatus).toHaveBeenCalledTimes(1);
    expect(setFavoriteStatus.mock.calls[0][0]).toBe(id);
    expect(setFavoriteStatus.mock.calls[0][1]).toBe(1);
  });
});
