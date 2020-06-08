import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Favorites from "./favorites";
import {TestOffers} from "../../types/test-types/offers-test-type";
import {TestUser} from "../../types/test-types/user-test-type";
import {TestRouteLocation} from "../../types/test-types/location-test-type";

const mockStore = configureStore();

// set mocha data
const favoriteOffers: TestOffers = [
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
const favoriteCities: string[] = [
  `Moscow`,
  `Omsk`,
];
const favoritesRequestStatus = `status`;
const favoritesRequestMessage = `message`;
const authorizationStatus = `AUTH`;
const userData: TestUser = {
  id: 1,
  name: `name`,
  avatar: `avatar`,
  status: true,
};
const history = {};
const location: TestRouteLocation = {
  pathname: `/pathname`,
};

const store = mockStore({
  favorites: {
    favoriteOffers,
  },
  user: {
    authorizationStatus: `NO_AUTH`,
    userData: null,
  }
});

it(`render Favorites`, () => {
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
  });

  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <Favorites
            favoritesRequestStatus={favoritesRequestStatus}
            favoritesRequestMessage={favoritesRequestMessage}
            favoriteOffers={favoriteOffers}
            favoriteCities={favoriteCities}
            authorizationStatus={authorizationStatus}
            userData={userData}
            history={history}
            location={location}
          />
        </Provider>
      </BrowserRouter>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
