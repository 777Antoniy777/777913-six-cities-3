import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PreviewPlace from "./preview-place";
import {Offer} from "../../types/offers-type";
import {RouteHistory} from "../../types/history-type";
import {RouteLocation} from "../../types/location-type";

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

it(`render PreviewPlace`, () => {
  const tree = renderer.create(
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
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
