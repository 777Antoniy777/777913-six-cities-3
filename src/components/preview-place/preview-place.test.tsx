import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PreviewPlace from "./preview-place";
import {TestOffer} from "../../types/test-types/offers-test-type";
import {TestRouteLocation} from "../../types/test-types/location-test-type";

const mockStore = configureStore();

// set mocha data
const placeData: TestOffer = {
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
const history = {};
const location: TestRouteLocation = {
  pathname: `/pathname`,
};

const getHoveredOffer = () => ({});
const removeHoveredOffer = () => ({});
const setFavoriteStatus = () => ({});

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
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

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
            getHoveredOffer={getHoveredOffer}
            removeHoveredOffer={removeHoveredOffer}
            setFavoriteStatus={setFavoriteStatus}
          />
        </Provider>
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
