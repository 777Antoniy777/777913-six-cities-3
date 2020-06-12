import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {PreviewPlace} from "./preview-place";
import {Offer} from "../../types/main-types/offers-type";
import {RouteHistory} from "../../types/main-types/history-type";
import {RouteLocation} from "../../types/main-types/location-type";

configure({adapter: new Adapter()});

const mockStore = configureStore();

// set mocha data
const placeData: Offer = {
  id: 1,
  city: {
    name: `city`,
    location: {
      latitude: 20,
      longitude: 20,
      zoom: 20,
    },
  },
  title: `title 1`,
  premium: false,
  favorite: false,
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
    id: 1,
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  location: {
    latitude: 20,
    longitude: 20,
    zoom: 20,
  },
};
const authorizationStatus = `AUTH`;
const favoritesRequestStatus = `status`;
const favoritesRequestMessage = `message`;
const location: RouteLocation = {
  hash: `hash`,
  key: `key`,
  pathname: `/pathname`,
  search: `search`,
  state: `state`,
};
const history: RouteHistory = {
  action: `action`,
  block: () => null,
  createHref: () => null,
  go: () => null,
  goBack: () => null,
  goForward: () => null,
  length: 90,
  listen: () => null,
  location,
  push: () => null,
  replace: () => null,
};

const store = mockStore({
  favorites: {
    requestStatus: null,
    requestMessage: null,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
  }
});

describe(`PreviewPlace should call correct functions`, () => {
  it(`page should scroll up after click on title`, () => {
    const scrollTo = jest.fn();
    Object.defineProperty(window, `scrollTo`, {
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
              getHoveredOffer={() => null}
              removeHoveredOffer={() => null}
              setFavoriteStatus={() => null}
            />
          </Provider>
        </BrowserRouter>
    );

    const title = previewPlace.find(`.place-card__name`);

    const mockEvent = {
      preventDefault: () => null,
    };

    title.simulate(`click`, mockEvent);

    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it(`function should set in arguments "placeData" after mouseenter on card`, () => {
    const getHoveredOffer = jest.fn();

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
              removeHoveredOffer={() => null}
              setFavoriteStatus={() => null}
            />
          </Provider>
        </BrowserRouter>
    );

    const card = previewPlace.find(`.place-card`);

    const mockEvent = {
      preventDefault: () => null,
    };

    card.simulate(`mouseenter`, mockEvent);

    expect(getHoveredOffer).toHaveBeenCalledTimes(1);
    expect(getHoveredOffer.mock.calls[0][0]).toMatchObject(placeData);
  });

  it(`function should set in arguments "null" after mouseleave on card`, () => {
    const removeHoveredOffer = jest.fn();

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
              getHoveredOffer={() => null}
              removeHoveredOffer={removeHoveredOffer}
              setFavoriteStatus={() => null}
            />
          </Provider>
        </BrowserRouter>
    );

    const card = previewPlace.find(`.place-card`);

    const mockEvent = {
      preventDefault: () => null,
    };

    card.simulate(`mouseleave`, mockEvent);

    expect(removeHoveredOffer).toHaveBeenCalledTimes(1);
    expect(removeHoveredOffer.mock.calls[0][0]).toBe(null);
  });

  it(`function should set in first argument "id" and changed favorite status set in second argument after click on the favorite button`, () => {
    const {id} = placeData;
    const setFavoriteStatus = jest.fn();

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
              getHoveredOffer={() => null}
              removeHoveredOffer={() => null}
              setFavoriteStatus={setFavoriteStatus}
            />
          </Provider>
        </BrowserRouter>
    );

    const favoriteButton = previewPlace.find(`.place-card__bookmark-button`);

    const mockClickEvent = {
      preventDefault: () => null,
    };

    favoriteButton.simulate(`click`, mockClickEvent);

    expect(setFavoriteStatus).toHaveBeenCalledTimes(1);
    expect(setFavoriteStatus.mock.calls[0][0]).toBe(id);
    expect(setFavoriteStatus.mock.calls[0][1]).toBe(1);
  });
});
